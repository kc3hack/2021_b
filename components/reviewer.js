import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";
import RatingStar from "./RatingStar";

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
    <li className="my-8  rounded-medium">
      <div className="flex">
        <div className="mr-4">
          {image_path && (
            <img src={image_path} className="w-24 h-auto max-h-24 "></img>
          )}
          <h1 className="text-center">{user?.display_name}</h1>
        </div>

        <div className="p-4  bg-white w-full">
          <div className="flex">
            <h1 className="mr-8 font-bold">{props.review?.title}</h1>
            <div className="my-auto">
              <RatingStar rating={props.review?.score} />
            </div>
          </div>

          <h1>{props.review?.content}</h1>

          <h1 className="mt-auto">
            {convertSecondToDate(props.review?.date.seconds)}投稿
          </h1>
        </div>
      </div>
    </li>
  );
};

export default Reviewer;
