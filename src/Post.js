import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });


// Feed.jsからfirebaseのデータをPost.jsに流す（props）
// ①propsを受け取る（つまり、このデータがわたってくるよ！っていうものを書いてあげる）
const Post = ({text, img, timestamp} ) => {
    const classes = useStyles();

    return (
        <>
        <Card className={classes.root}>
            <CardActionArea>
                {/* 画像を表示　imgタグを使って、imgのURLをsrc={xxx}に渡してあげる */}
                <CardMedia className={classes.media} image={img} title={text} />
                {/* <div className="text">{text}</div> */}

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* 記述1. テキスト情報が渡ってくる */}
                        {text}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {new Date(timestamp?.toDate()).toLocaleString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </>
    );
};

export default Post
