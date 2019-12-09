import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { auth } from "./firebase";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Orders from "./Orders";
import Photos from "./Photos";

export function App(props) {
  const [user, setUser] = useState(null);
  const [drawer_open, setDrawerOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });
    return unsubscribe;
  }, [props.history]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" style={{ flexGrow: 1 }}>
            Magellan Orders
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Welcome {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <ListItem>
          <ListItemIcon />
          <ListItemText>
            <Button
              to="/app/orders/grocery-orders"
              component={Link}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Groceries
            </Button>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon />
          <ListItemText>
            <Button
              to="/app/orders/office-orders/"
              component={Link}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Office Supplies
            </Button>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon />
          <ListItemText>
            <Button
              to="/app/photos/grocery-photos/"
              component={Link}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Grocery Pics
            </Button>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon />
          <ListItemText>
            <Button
              to="/app/photos/office-photos/"
              component={Link}
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              Office Supplies Pics
            </Button>
          </ListItemText>
        </ListItem>
      </Drawer>
      <Route
        path="/app/orders/:group/"
        render={routeProps => {
          return <Orders {...routeProps} />;
        }}
      />
      <Route
        path="/app/photos/:group/"
        render={routeProps => {
          return <Photos {...routeProps} />;
        }}
      />
    </div>
  );
}
