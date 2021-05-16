import React, { useState } from "react";
import firebase from "firebase/app";
// 記述5
import { storage, db } from "./firebase";
const TweetInput = () => {
  // useStateを記述
  // 記述3　画像を保持するためのuseState
  const [inputImage, setInputImage] = useState(null);
  // 入力された文字を保持します
  const [message, setMessage] = useState("");
  // const handleInputChange = (e) => {
  //   setMessage(e.target.value);
  // };
  // 記述3 ファイル選択→画像を選ぶ　画像を保持する
  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0], "画像");
      // 画像
      setInputImage(e.target.files[0]);
      // 入力部分をからにする
      e.target.value = "";
    }
  };
  // 記述4. 送信ボタンが押されたら（エンターが押されたら）送信の処理=firebaseにデータを登録する処理を書きます
  const sendTweet = (e) => {
    // useStateで保持した変数を確認
    console.log(message);
    console.log(inputImage);

    // formタグを使うと送信の際にリフレッシュされます（画面がリロードされるということ）
    // formタグを使う時は必須！絶対入ります！
    e.preventDefault();

    if (inputImage) {
      // 画像 + テキストを登録させる
            // 記述6
      // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
      // そのためにファイル名をランダムなファイル名を作る必要がある、それが下
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
      const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomMoji + "_" + inputImage.name;
      // firebase storageに登録する処理
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(inputImage);
      
      // 記述7
      // firebaseのDBに登録する処理
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // 3つ設定できる
        // 進捗度合い = プログレス
        // エラーに関する = アップロードがうまくいかないなどのエラーを管理する
        // 成功した時 今回でいうと async（非同期＝何かを実行した後に次のことをするためのもの）
        () => {}, //進捗度合いの管理するもの、
        (err) => {
          //エラーに関する処理
          alert(err.message);
        },
        async () => {
          //成功したとき
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("posts").add({
                image: url,
                text: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );


    } else {
      // テキストだけ（input="text" だけ）
      db.collection("posts").add({
        image: "",
        text: message,
        // import でimport firebase from "firebase/app";を上に書いてください🤗
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };
  return (
    <div>
      {/* 登録の担当をするパーツ（コンポーネント） */}
      {/* TweetInputではinputタグや送信ボタンを置いて、firebaseにデータを登録するものを記述します */}
      <h1>TweetInput</h1>
      {/* formタグを使います */}
      <form onSubmit={sendTweet}>
        <div>
          {/* 記述1　inputを設置し、入力欄を作ります */}
          <input
            type="text"
            placeholder="文字を入力してください"
            autoFocus
            value={message}
            // 入力された文字を取得するためにonChangeイベントを設定します
            // 直接setMessageで更新して書く方法
            onChange={(e) => setMessage(e.target.value)}
            // ↓前回まではこっち、上とこっちどちらも結果は同じ
            // onChange={handleInputChange}
          />
        </div>
        <hr />
        <div>
          {/* 記述2 画像登録するようのinput */}
          <input type="file" onChange={onChangeImageHandler} />
        </div>
        <hr />
        <div>
          {/* disabledは前回やったように、から文字だったら押せないという書き方になります！ */}
          <button type="submit" disabled={!message}>
            送信
          </button>
        </div>
      </form>
    </div>
  );
};
export default TweetInput;