import MainLayout from "../layouts/Main/index";
import Reviewer from "../components/reviewer";
import NameEditor from "../components/NameEditor";
import ProfileEditor from "../components/ProfileEditor";

import firebase from "firebase/app";
import React, { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";

import { storage } from "./_app";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyPage = (props) => {
  const [authUser, authLoading, authError] = useAuthState(firebase.auth());
  const uid = authUser?.uid;

  const [user] = useDocumentData(
    uid && firebase.firestore().doc(`user/${uid}`)
  );

  const [image_url, loading, error] = useDownloadURL(
    uid && firebase.storage().ref(`user_icon/${uid}.png`)
  );

  const [default_url] = useDownloadURL(
    firebase.storage().ref("user_icon/icon-user-pink.png")
  );

  const [name, setName] = useState("");
  const postNewName = async () => {
    await (uid && firebase.firestore().doc(`user/${uid}`)).update({
      display_name: name,
    });
    setNameEditorState(false);
  };

  const [profile, setProfile] = useState("");
  const postNewProfile = async () => {
    await (uid && firebase.firestore().doc(`user/${uid}`)).update({
      profile: profile,
    });
    setProfileEditorState(false);
  };

  // ユーザプロフィールを予めstateに入れておく
  const [isProfileReady, setProfileReady] = useState(false);
  if (user && !isProfileReady) {
    setProfileReady(true);
    setName(user.display_name);
    setProfile(user?.profile);
  }

  // このユーザの全てのレビューを取得
  const [reviews] = useCollectionData(
    uid &&
      firebase
        .firestore()
        .collection("review")
        .where("user_id_token", "==", uid),
    { idField: "id" }
  );

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setError] = useState("");
  const [progress, setProgress] = useState(100);

  const [isEditingName, setNameEditorState] = useState(false);
  const [isEditingAvatar, setAvatarEditorState] = useState(false);
  const [isEditingProfile, setProfileEditorState] = useState(false);

  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
    console.log(image);
    setError("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (image === "") {
      console.log("ファイルが選択されていません");
      setError("ファイルが選択されていません");
      return;
    }
    // アップロード処理
    console.log("アップロード処理");
    const storageRef = storage.ref("user_icon"); //どのフォルダの配下に入れるかを設定
    const imagesRef = storageRef.child(uid + ".png"); //ファイル名

    console.log("ファイルをアップする行為");
    const upLoadTask = imagesRef.put(image);
    console.log("タスク実行前");

    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot", snapshot);
      },
      (error) => {
        console.log("err", error);
        setError("ファイルアップに失敗しました。" + error);
        setProgress(100); //実行中のバーを消す
      },
      async () => {
        let url = "";
        // 完了後の処理
        // 画像表示のため、アップロードした画像のURLを取得
        await imagesRef.getDownloadURL().then((fireBaseUrl) => {
          console.log(`画像のURL:${fireBaseUrl}`);
          url = fireBaseUrl;
          console.log("url:firebaseurl");
        });
        await firebase.firestore().collection("user").doc(uid).update({
          icon_url: url,
        });
        location.reload();
      }
    );
  };

  return (
    <MainLayout>
      <h1 className="mb-4 outlined-rocknroll text-4xl">マイページ</h1>
      <div className="flex ">
        <div>
          <img
            src={image_url ? image_url : default_url}
            className="inline-block w-32 h-32"
          ></img>

          <div className="my-4">
            {imageError && <div variant="danger">{imageError}</div>}
            <form onSubmit={onSubmit}>
              <input type="file" onChange={handleImage} />
              <button type="button" onClick={onSubmit}>
                <FontAwesomeIcon icon="check" />
              </button>
            </form>
            {progress !== 100 && <LinearProgressWithLabel value={progress} />}
            {imageUrl && (
              <div>
                <img width="400px" src={imageUrl} alt="uploaded" />
              </div>
            )}
          </div>
        </div>
        <div className="mx-8">
          <NameEditor
            isEditing={isEditingName}
            displayName={name}
            startEditingCallback={() => setNameEditorState(true)}
            nameChangeCallback={(n) => setName(n)}
            submitCallback={postNewName}
          />

          <ProfileEditor
            isEditing={isEditingProfile}
            profileText={profile}
            startEditingCallback={() => setProfileEditorState(true)}
            profileChangeCallback={(p) => setProfile(p)}
            submitCallback={postNewProfile}
          />
        </div>
      </div>

      <div className="p-12">
        <h1>レビュー</h1>
        <ul>
          {reviews?.map((review) => {
            return (
              <Reviewer
                key={review?.id}
                review={review}
                isTirolRepoPage={false}
              />
            );
          })}
        </ul>
      </div>
    </MainLayout>
  );
};

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default MyPage;
