import dayjs from "dayjs";
import RatingStar from "./RatingStar";
import firebase from "firebase/app";
import { useDownloadURL } from "react-firebase-hooks/storage";

const InnerReview = (props) => {
  const convertSecondToDate = (timestamp) => {
    return dayjs(timestamp * 1000).format("YYYY/MM/DD HH:MM");
  };

  const [default_url] = useDownloadURL(
    firebase.storage().ref("user_icon/icon-user-pink.png")
  );

  return (
    <li className="my-8  rounded-medium">
      <div className="flex">
        <div className="mr-4">
          <img
            src={props.icon_url ? props.icon_url : default_url}
            className="inline-block w-24 h-auto max-h-24 "
          ></img>
          <h1 className="text-center">{props.icon_title}</h1>
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

export default InnerReview;
