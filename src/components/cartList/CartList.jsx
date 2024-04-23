// import React from 'react';


import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Alert from "@mui/material/Alert";
import "./CardList.css";
import { Button } from "@mui/material";
import { Link} from "react-router-dom";

export default function CartList({ updateQty, cartData, deleteCart }) {


    // Check if cartData is an array
    if (!Array.isArray(cartData)) {
      return (
        <div style={{ padding: 50 }}>
          <Alert severity="error">Error: Invalid cart data!</Alert>
        </div>
      );
    }
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {cartData.map((v, i) => (
        <div className="ListItemMain" key={i}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar style={{ padding: 5 }}>
              <img
                style={{ width: 70, height: 70, objectFit: "contain" }}
                src={v.image}
                alt=""
              />
            </ListItemAvatar>
            <ListItemText
              primary={v.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span" // Specify component as span
                    sx={{ display: "inline" }}
                    variant="body2"
                    color="text.primary"
                  >
                    Rs {v.price * v.qty}
                  </Typography>
                  <Typography component="div" style={{ display: "flex" }}> {/* Specify component as div */}
                    {"QTY:"}
                    <RemoveCircleOutlineIcon
                      onClick={() => v.qty > 1 && updateQty("-", v.id)}
                      className="qtyIcon"
                    />
                    <span>{v.qty}</span>
                    <ControlPointIcon
                      onClick={() => updateQty("+", v.id)}
                      className="qtyIcon"
                    />
                    <DeleteOutlineIcon
                      onClick={() => deleteCart(v.id)}
                      className="DeleteOutlineIcon"
                    />
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
      {cartData.length ? (
        <Link to="/checkout">
          <Button
            size="small"
            className="cart-btn chackoutBtn"
          >
            CHECKOUT
          </Button>
        </Link>
      ) : (
        <div style={{ padding: 50 }}>
          <Alert severity="warning">Your cart is Empty!</Alert>
        </div>
      )}
    </List>
  );
}

