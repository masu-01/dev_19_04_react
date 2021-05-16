import React from 'react'

// Feed.jsからfirebaseのデータをPost.jsに流す（props）

// ①propsを受け取る
const Post = ({text, img, timestamp} ) => {
    return (
        <div className="result-area">

            {/* ②テキストが渡ってくる */}
            <div className="text">{text}</div>

            {/* ③画像を表示 */}
            <div>
                <img src={img} alt="" style={{ width:'200px'}}/>
            </div>

            {/* ④日付を表示 */}
            <div className="date">
                {new Date(timestamp?.toDate()).toLocaleString()}
            </div>
            
        </div>
    );
};

export default Post
