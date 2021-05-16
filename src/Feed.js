import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Post from "./Post";
import Tweetinput from "./Tweetinput";

// Post.jsを読み込む
const Feed = () => {
    // useState
    // forebaseに作成したデータを受け取るために必要な箱のこと(useState)
    // useStateを記述してfirebaseに登録されているデータの項目と同じにする（オブジェクト）
    const [posts, setPosts] = useState([
        {
            id:"",
            image:"",
            text:"",
            timestamp: null
        }
    ]);

    // useEffect
    // firebaseのデータを取得してuseStateで保持する
    useEffect(() => {
        const firebaseData = db
        .collection("posts")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot) => 
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    image: doc.data().image,
                    text: doc.data().text,
                    timestamp: doc.data().timestamp,
                }))
                )
            );
            return () => {
            firebaseData();
            };
        }, []);

        console.log(posts,"fireaseの中身")

    return (
        <div>
            {/*  */}
            <Tweetinput />
            <hr />

            {/* Post.jsを読み込む */}
            {/* 記述3 postsの中にはfirebaseのデータがページが読み込まれた際に取得できています */}
            {/* postsをes6のmapを使って１件ずつ表示します */}
            {posts.map((postItem) => (
            //es6のmapを使うときは「mapを使って処理をしている箇所で」[key]の指定が必要です
            //keyがあるとバーチャルドムのkeyが指定できる？
                <Post
                    key={postItem.id}
                    img={postItem.image}
                    text={postItem.text}
                    timestamp={postItem.timestamp}
                />
            ))}
        </div>
    )
}

export default Feed
