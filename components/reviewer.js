import { useState } from "react";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";

import InnerReview from "../components/InnerReview";

const Reviewer = (props) => {
  let icon_url = "";
  let icon_title = "";

  // チロレポページではユーザアイコンとユーザ名を表示
  if (props.isTirolRepoPage) {
    const uid = props.review?.user_id_token;
    const [user] = useDocumentData(
      uid && firebase.firestore().doc(`user/${uid}`)
    );
    icon_url = user?.icon_url;
    icon_title = user?.display_name;

    // マイページではチロル画像と商品名を表示
  } else {
    const tirol_id = props.review?.tirol_id;
    const [tirol_doc] = useDocumentData(
      tirol_id && firebase.firestore().doc(`tirol/${tirol_id}`)
    );
    icon_url = tirol_doc?.image;
    icon_title = tirol_doc?.name;
  }

  const [default_url] = useDownloadURL(
    firebase.storage().ref("user_icon/icon-user-pink.png")
  );

  return (
    <InnerReview
      review={props.review}
      icon_url={icon_url}
      icon_title={icon_title}
    />
  );
};

export default Reviewer;
