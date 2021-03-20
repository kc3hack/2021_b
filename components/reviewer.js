import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";
import RatingStar from "./RatingStar"

import dayjs from "dayjs";

const Reviewer = (props) => {
  // レビュアーデータ取得
  const uid = props.review?.user_id_token;
  const [user] = useDocumentData(
    uid && firebase.firestore().doc(`user/${uid}`)
  );

  const [image_path, loading, error] = useDownloadURL(
    uid && firebase.storage().ref(`user_icon/${uid}.png`)
  );

  const convertSecondToDate = (timestamp) => {
    return dayjs(timestamp * 1000).format("YYYY/MM/DD HH:MM");
  };

  return (
    <li className="my-8">
      <h1>{user?.display_name}</h1>
      {image_path && <img src={image_path} className="w-12"></img>}

      <h1>{props.review?.title}</h1>
      <h1><RatingStar rating={props.review?.score} maxRate={5} /></h1>
      <h1>{props.review?.content}</h1>
      <div>{convertSecondToDate(props.review?.date.seconds)}投稿</div>
    </li>
  );
};

export default Reviewer;
