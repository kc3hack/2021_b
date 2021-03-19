import MainLayout from "../layouts/Main/index";
import Reviewer from "../components/review";

import firebase from "firebase/app";
import React, { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";

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

  return (
    <MainLayout>
      <div className="flex ">
        {image_url && <img src={image_url} className="w-32 h-32"></img>}
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

export default MyPage;
