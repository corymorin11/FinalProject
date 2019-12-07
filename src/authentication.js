import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { auth } from "./firebase";

export function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(u => {
      if (u) {
        props.history.push("/app/");
      }
    });
  }, [props.history]);

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography color="inherit">Sign In</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
        <Paper style={{ padding: 20, maxWidth: 500, width: "100%" }}>
          <TextField
            placeholder="Email"
            fullWidth
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            style={{ marginTop: 20 }}
            placeholder="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 15
            }}
          >
            <Typography>
              Don't have an account? <Link to="/signup/">Sign Up!</Link>
            </Typography>
            <Button variant="contained" color="primary" onClick={handleSignIn}>
              {" "}
              Sign In
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        props.history.push("/app/");
      }
    });
    return unsubscribe;
  }, [props.history]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography color="inherit">Sign Up</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
        <Paper style={{ padding: 20, maxWidth: 500, width: "100%" }}>
          <TextField
            placeholder="Email"
            fullWidth
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            style={{ marginTop: 20 }}
            placeholder="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 15
            }}
          >
            <Typography>
              Already have an account? <Link to="/">Sign In!</Link>
            </Typography>
            <Button variant="contained" color="primary" onClick={handleSignUp}>
              {" "}
              Sign Up
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}
