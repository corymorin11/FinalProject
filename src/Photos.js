import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Photocard from "./Photocard";
import AddPhoto from "./AddPhoto";
import Button from "@material-ui/core/Button";
import { snapshotToArray } from "./firebase";

export default function Photos(props) {
  const [open_dialog, setOpen_Dialog] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection(props.match.params.group)
      .onSnapshot(snapshot => {
        const updated_photos = snapshotToArray(snapshot);
        setPhotos(updated_photos);
      });
    return unsubscribe;
  }, [props]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingTop: 10
      }}
    >
      {photos.map(p => {
        return <Photocard photo={p} />;
      })}
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={() => {
            setOpen_Dialog(true);
          }}
        >
          Add Photo of Order
        </Button>
      </div>
      <AddPhoto
        open={open_dialog}
        onClose={() => {
          setOpen_Dialog(false);
        }}
        group_id={props.match.params.group}
      />
    </div>
  );
}
