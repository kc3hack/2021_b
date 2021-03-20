import UserProfileButton from "../UserProfileButton";

import firebase from "firebase/app";

import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";

import Link from "next/link";

const Header = () => {
  const [authUser, authLoading, authError] = useAuthState(firebase.auth());
  const uid = authUser?.uid;

  const [user] = useDocumentData(
    uid && firebase.firestore().doc(`user/${uid}`)
  );

  const [image_url, loading, error] = useDownloadURL(
    uid && firebase.storage().ref(`user_icon/${uid}.png`)
  );

  return (
    <header>
      <div className="flex flex-row bg-red">
        <Link href={"/"} as={"/"}>
          <img src="TiroKatsu_logo.svg" className="ml-20 w-20 h-15" />
        </Link>
        <p className="ml-5 py-4 text-xs">
          チロルチョコファンのためのポータルサイト
        </p>
        <p className="ml-20 py-4 text-xs">チロルレシピ</p>
        <UserProfileButton
          isLoggedIn={authUser !== null}
          avatarImageUrl={image_url}
          userDisplayName={user?.display_name}
        />
        <Link href={"/tirolrepo"} as={"/tirolrepo"}>
          <button className="ml-20 py-4 text-xs">チロレポ</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
