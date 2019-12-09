import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState("");

  const addOrder = () => {
    db.collection(props.match.params.group)
      .add({ message: newOrder, checked: false })
      .then(() => {});
    setNewOrder("");
  };

  const deleteOrder = order_id => {
    db.collection(props.match.params.group)
      .doc(order_id)
      .delete();
  };

  const changeChecked = (checked, order_id) => {
    db.collection(props.match.params.group)
      .doc(order_id)
      .update({ checked: checked });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection(props.match.params.group)
      .onSnapshot(snapshot => {
        const grocery_orders = snapshot.docs.map(qs => {
          return {
            id: qs.id,
            text: qs.data().message,
            checked: qs.data().checked
          };
        });
        setOrders(grocery_orders);
      });
    return unsubscribe;
  }, [props]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper style={{ padding: 30, width: 700, marginTop: 20 }}>
        <Typography variant="h6">Orders</Typography>
        <div style={{ display: "flex" }}>
          <TextField
            placeholder="Add a new order here"
            fullWidth
            style={{ marginTop: 15, marginRight: 15 }}
            onKeyPress={e => {
              if (e.key === "Enter") {
                addOrder();
              }
            }}
            value={newOrder}
            onChange={event => {
              setNewOrder(event.target.value);
            }}
          />
          <Button variant="contained" color="primary" onClick={addOrder}>
            Add New Order
          </Button>
        </div>
        <List>
          {orders.map(value => {
            return (
              <ListItem key={value.id}>
                <ListItemIcon>
                  <Checkbox
                    checked={value.checked}
                    onChange={e => {
                      changeChecked(e.target.checked, value.id);
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={value.text} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      deleteOrder(value.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}
