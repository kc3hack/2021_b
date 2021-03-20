import React, { useState } from "react";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TirolCard from "./TirolCard";
import Modal from "react-modal";
import Upload from "./upload";

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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="space-x-4 space-y-4 ">
        <img
          src="/upload-tirol-icon.png"
          onClick={openModal}
          className="inline-block"
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
