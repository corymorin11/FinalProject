import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function Photocard(props) {
  return (
    <Card
      style={{ marginLeft: 15, marginTop: 15, marginRight: 15, maxWidth: 375 }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={props.photo.image}
          title={props.photo.title}
        />
        <CardContent>
          <Typography>{props.photo.title}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions />
    </Card>
  );
}
