import React from "react";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TirolCard from "./TirolCard";
// import Icon from "@material-ui/core/Icon";

const TirolList = () => {
  const [tirols, loading, error] = useCollectionData(
    firebase.firestore().collection("tirol"),
    {
      idField: "id",
    }
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }
  return (
    <div className="bg-pink p-16">
      <div className="space-x-4 space-y-4 ">
        {tirols.map((tirol) => (
          <div key={tirol.id} className="inline-block">
            <TirolCard tirolData={tirol} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TirolList;
