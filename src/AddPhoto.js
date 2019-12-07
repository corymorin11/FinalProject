import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { db, storage } from "./firebase";
import uuid from "node-uuid";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AddPhoto(props) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [upload, setUpload] = useState(false);

  const handleFile = e => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUploadPhoto = () => {
    setUpload(true);
    storage
      .ref("photos/" + uuid())
      .put(file)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          db.collection(props.group_id)
            .add({ title: title, image: downloadURL })
            .then(() => {
              setTitle("");
              setFile(null);
              setUpload(false);
              props.onClose();
            });
        });
      });
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Photo of Order</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Photo Title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          {file && (
            <Typography style={{ marginRight: 20 }}>{file.name}</Typography>
          )}
          <Button variant="contained" component="label">
            Choose a file
            <input
              type="file"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <div style={{ position: "relative" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUploadPhoto}
          >
            Upload
          </Button>
          {upload && (
            <CircularProgress
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -12,
                marginLeft: -12
              }}
              color="primary"
              size={24}
            />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}
