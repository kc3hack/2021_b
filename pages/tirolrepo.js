import MainLayout from "../layouts/Main/index";
import Reviewer from "../components/reviewer";

import firebase from "firebase/app";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";

const TirolRepo = () => {
  const tirol_id = "RQ1HqfOdsovmWym7jv3L";

  // チロルデータ取得
  const [tirol_doc] = useDocumentData(
    tirol_id && firebase.firestore().doc(`tirol/${tirol_id}`)
  );

  // チロル画像取得
  const [image_path] = useDownloadURL(
    tirol_id && firebase.storage().ref(`tirol/${tirol_id}.png`)
  );

  // このチロルの全てのレビューを取得
  const [reviews] = useCollectionData(
    firebase.firestore().collection("review").where("tirol_id", "==", tirol_id),
    { idField: "id" }
  );

  console.log(reviews);

  return (
    <MainLayout>
      <h1>{tirol_doc?.name}</h1>
      <h1>星評価{tirol_doc?.average_score}</h1>
      {image_path && <img src={image_path}></img>}
      <div className="p-12">
        <h1>レビュー</h1>
        <ul>
          {reviews?.map((review) => {
            return <Reviewer key={review?.user_id_token} review={review} />;
          })}
        </ul>
      </div>
    </MainLayout>
  );
};

export default TirolRepo;
