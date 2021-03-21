import React, { useState } from "react";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TirolCard from "./TirolCard";
import Modal from "react-modal";
import Upload from "./upload";
import Router from "next/router";

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  content: {
    position: "absolute",
    top: "5rem",
    left: "5rem",
    right: "5rem",
    bottom: "5rem",
    backgroundColor: "paleturquoise",
    borderRadius: "1rem",
    padding: "1.5rem",
  },
};

Modal.setAppElement("body");

const TirolList = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState("");
  let [tirols, loading, error] = useCollectionData(
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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  async function onSearch() {
    console.log(tirols);
    await firebase
      .firestore()
      .collection("tirol")
      .orderBy("name")
      .startAt(name)
      .endAt(name + "\uf8ff")
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          // console.log(tirols);
          tirols = doc.data();
          // console.log(tirols);
          // console.log(`tirols:${tirols.name}`);
          let name = doc.data().name;
          let arraySplit = name.split("");
          console.log(arraySplit);
          console.log(`${doc.id}: ${doc.data().name}`);
          Router.push({
            pathname: "/tirolrepo",
            query: { name: `${doc.id}` },
          });
        });
        console.log(`tirols:${tirols.name}`);
      });
    console.log(`tirols2:${tirols}`);
  }
  return (
    <>
      <p className="pb-6 pl-32 text-xl text-left">
        感想を見たい・書きたいチロルチョコを選ぼう▼
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-bg"
          placeholder=""
        ></input>
        <button className="pl-2" onClick={onSearch}>
          検索
        </button>
      </p>
      <div className="grid grid-cols-auto gap-4 bg-pink p-16">
        <img
          src="/upload-tirol-icon.png"
          onClick={openModal}
          className="inline-block w-32 h-32"
        />
        {tirols.map((tirol) => (
          <div key={tirol.id} className="inline-block">
            <TirolCard tirolData={tirol} />
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <Upload />
      </Modal>
    </>
  );
};

export default TirolList;
