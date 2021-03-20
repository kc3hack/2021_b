import { useState } from "react";

import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";

const NewReview = (props) => {
  // 認証情報取得
  const [authUser, authLoading, authError] = useAuthState(firebase.auth());
  const uid = authUser?.uid;

  // ユーザデータ取得
  const [user] = useDocumentData(
    uid && firebase.firestore().doc(`user/${uid}`)
  );

  // ユーザアイコン取得
  const [image_path, loading, error] = useDownloadURL(
    uid && firebase.storage().ref(`user_icon/${uid}.png`)
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState(0);

  const [isWritten, setIsWritten] = useState(false);

  // 投稿処理
  const postNewReview = async () => {
    // タイトル，感想，スコアのどれかが未入力なら投稿しない
    if (!title || !content || !score) {
      return;
    }

    await firebase.firestore().collection("review").add({
      content: content,
      date: firebase.firestore.Timestamp.now(), //fromDate(Date.now()),
      score: score,
      tirol_id: props.tirol_id,
      title: title,
      user_id_token: uid,
    });

    // stateの初期化
    setTitle("");
    setContent("");
    setScore(0);
    document.getElementById("default-score").selected = true;
  };

  // 未ログインなら表示しない
  if (!uid) {
    return <></>;
  }

  return (
    <div className="flex rounded-sm">
      <div>
        {image_path && <img src={image_path} className="w-12"></img>}
        <h1>{user?.display_name}</h1>
      </div>

      <div className="px-4 w-full bg-white">
        <div className="">
          <input
            type="text"
            placeholder="タイトルを入力してください"
            minLength={4}
            className="py-2 outline-none w-full"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <select
            name="score"
            className="p-1 bg-pink"
            onChange={(e) => setScore(e.target.value)}
            required
          >
            <option value="" id="default-score">
              5段階評価するならいくつ星？
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div className="">
          <input
            type="text"
            placeholder="このチロルチョコへの思い・感想を書こう！"
            minLength={4}
            className=" py-2 outline-none w-full pb-8"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="button"
          // disabled={!isWritten}
          className="m-1  px-4 py-2 float-right bg-pink rounded-sm"
          onClick={postNewReview}
        >
          投稿
        </button>
      </div>
    </div>
  );
};

export default NewReview;
