import MainLayout from "../layouts/Main/index";
import Reviewer from "../components/reviewer";
import NewReview from "../components/NewReview";

import { useRouter } from "next/router";

import firebase from "firebase/app";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";

const TirolRepo = () => {
  const router = useRouter();
  const tirol_id = router.query.name || "";

  // チロルデータ取得
  const [tirol_doc] = useDocumentData(
    tirol_id && firebase.firestore().doc(`tirol/${tirol_id}`)
  );

  // このチロルの全てのレビューを取得
  const [reviews] = useCollectionData(
    firebase
      .firestore()
      .collection("review")
      ?.where("tirol_id", "==", tirol_id),
    { idField: "id" }
  );

  return (
    <MainLayout>
      <div className="flex">
        {<img src={tirol_doc?.image} className="inline-block w-32 h-32"></img>}
        <div>
          <h1>{tirol_doc?.name}</h1>
          <h1>星評価{tirol_doc?.average_score}</h1>
        </div>
      </div>

      <div className="py-12">
        <NewReview tirol_id={tirol_id} />

        <h1>みんなのチロレポ</h1>

        <ul>
          {reviews?.map((review) => {
            return (
              <Reviewer
                key={review?.id}
                review={review}
                isTirolRepoPage={true}
              />
            );
          })}
        </ul>
      </div>
    </MainLayout>
  );
};

export default TirolRepo;
