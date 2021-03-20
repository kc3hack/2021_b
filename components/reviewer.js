import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";

import dayjs from "dayjs";
import ReactDOM from 'react-dom'

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

  const RatingStar = ({ rating, maxRate }) => (
    <svg
      style={{ width: "7%" }}
      viewBox="0 0 640 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="star">
        <path d="M64 0L78.3689 44.2229H124.868L87.2494 71.5542L101.618 115.777L64 88.4458L26.3817 115.777L40.7506 71.5542L3.13238 44.2229H49.6311L64 0Z" />
        <path d="M192 0L206.369 44.2229H252.868L215.249 71.5542L229.618 115.777L192 88.4458L154.382 115.777L168.751 71.5542L131.132 44.2229H177.631L192 0Z" />
        <path d="M320 0L334.369 44.2229H380.868L343.249 71.5542L357.618 115.777L320 88.4458L282.382 115.777L296.751 71.5542L259.132 44.2229H305.631L320 0Z" />
        <path d="M448 0L462.369 44.2229H508.868L471.249 71.5542L485.618 115.777L448 88.4458L410.382 115.777L424.751 71.5542L387.132 44.2229H433.631L448 0Z" />
        <path d="M576 0L590.369 44.2229H636.868L599.249 71.5542L613.618 115.777L576 88.4458L538.382 115.777L552.751 71.5542L515.132 44.2229H561.631L576 0Z" />
      </clipPath>
      <rect
        width={(rating / maxRate) * 640}
        height="128"
        fill="#FF7A00"
        clipPath="url(#star)"
      />
    </svg>
  );

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
