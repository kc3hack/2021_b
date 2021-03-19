import MainLayout from "../layouts/Main/index";

import firebase from "firebase/app";
import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";

const MyPage = (props) => {
  const [authUser, authLoading, authError] = useAuthState(firebase.auth());

  const uid = authUser?.uid;

  const [user] = useDocumentData(
    uid && firebase.firestore().doc(`user/${uid}`)
  );
  console.log(user);

  const [value, loading, error] = useDownloadURL(
    firebase.storage().ref("user_icon/チロリストちあ吉アイコン72正方形 1.png")
  );

  return (
    <MainLayout>
      <h1>{user?.display_name}</h1>
      {value && <img src={value}></img>}
    </MainLayout>
  );
};

export default MyPage;
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

