import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Post from "./Post";
import Tweetinput from "./Tweetinput";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData'; →これが登録する中身（ここでいうPost）ってことかな。。。


// material-uiの設定
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
      title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
    }));


// Post.jsを読み込む
const Feed = () => {
    const classes = useStyles();
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
            <Tweetinput />
            <hr />
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {posts.map((tile) => (      //ここのtileDataをpostsに書き換えた
                        <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                        title={tile.title}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            <IconButton aria-label={`star ${tile.title}`}>
                            <StarBorderIcon className={classes.title} />
                            </IconButton>
                        }
                        />
                        </GridListTile>
                    ))}
                </GridList>

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
        </div>
    )
}

export default Feed
