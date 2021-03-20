import React, { useState } from "react";
import firebase from "firebase/app";
import { storage } from "../pages/_app";

function Upload() {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");

  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }
    // アップロード処理
    const uploadTask = storage.ref(`/tirol/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };
  const next = (snapshot) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };
  const error = (error) => {
    // エラーハンドリング
    console.log(error);
  };
  const complete = async () => {
    let url = "";
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    await storage
      .ref("tirol")
      .child(image.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        console.log(`画像のURL:${fireBaseUrl}`);
        setImageUrl(fireBaseUrl);
        url = fireBaseUrl;
        console.log("url:firebaseurl");
      });
    await firebase.firestore().collection("tirol").doc().set({
      image: url,
      name: name,
    });
  };
  return (
    <div>
      <h1>名前</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <h1>画像アップロード</h1>
      <input type="file" onChange={handleImage} />
      <button
        type="button"
        className="m-1  px-4 py-2 bg-pink rounded-sm"
        onClick={onSubmit}
      >
        投稿
      </button>
      <img src={imageUrl} alt="uploaded" />
    </div>
  );
}
export default Upload;
