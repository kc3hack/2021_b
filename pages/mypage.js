import MainLayout from "../layouts/Main/index";
import Reviewer from "../components/reviewer";

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

const MyPage = (props) => {
  const [authUser, authLoading, authError] = useAuthState(firebase.auth());
  const uid = authUser?.uid;

  const [user] = useDocumentData(
    uid && firebase.firestore().doc(`user/${uid}`)
  );

  const [image_url, loading, error] = useDownloadURL(
    uid && firebase.storage().ref(`user_icon/${uid}.png`)
  );

  const [name, setName] = useState("");
  const postNewName = async () => {
    await (uid && firebase.firestore().doc(`user/${uid}`)).update({
      display_name: name,
    });
  };

  const [profile, setProfile] = useState("");
  const postNewProfile = async () => {
    await (uid && firebase.firestore().doc(`user/${uid}`)).update({
      profile: profile,
    });
  };

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
      () => {
        location.reload();
      }
    );
  };

  return (
    <MainLayout>
      <div className="flex ">
        {image_url && <img src={image_url} className="inline-block w-32 h-32"></img>}
        <div className="mx-8">
          <div className="my-4">
            <h1>名前</h1>
            <h1>{user?.display_name}</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button type="button" onClick={postNewName}>
              変更
            </button>
          </div>

          <div className="my-4">
            アイコン
            {imageError && <div variant="danger">{error}</div>}
            <form onSubmit={onSubmit}>
              <input type="file" onChange={handleImage} />
              <button onClick={onSubmit}>アップロード</button>
            </form>
            {progress !== 100 && <LinearProgressWithLabel value={progress} />}
            {imageUrl && (
              <div>
                <img width="400px" src={imageUrl} alt="uploaded" />
              </div>
            )}
          </div>

          <div className="my-4">
            <h1>プロフィール</h1>
            <h1>{user?.profile}</h1>
            <input
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
            <button type="button" onClick={postNewProfile} className="">
              変更
            </button>
          </div>
        </div>
      </div>

      <div className="p-12">
        <h1>レビュー</h1>
        <ul>
          {reviews?.map((review) => {
            // FIXME: review idをkeyにしたいけど取得方法がわからんねん
            return <Reviewer key={review?.title} review={review} />;
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
