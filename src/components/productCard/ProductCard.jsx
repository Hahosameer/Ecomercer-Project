import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import "./card.css";
import CartContext from "../contexts/cart";

export default function MediaCard({ product, viewDetail ,cartData }) {
  const { cart, setCart } = useContext(CartContext);

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = snackbarState;

  const handleClick = () => {
    setSnackbarState({ ...snackbarState, open: true });
  };

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const addToCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartData.findIndex((v) => v.id === product.id);
    if (index !== -1) {
      cartData.splice(index, 1, {...cartData[index], qty:
        cartData[index].qty + 1});
    }else{
        cartData.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart(cartData);
    handleClick(); // Open Snackbar when adding to cart
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      let starColor = i < product.rating.rate ? "#ffd700" : "#9e9e9e"; // Change star color based on rating
      stars.push(
        <div key={i} style={{ display: "inline-block", marginRight: 2 }}>
          <StarBorderIcon style={{ color: starColor, fontSize: 18 }} />
        </div>
      );
    }
    return stars;
  };

  return (
    <Card
      sx={{ width: 250, marginTop: 3, position: "relative", paddingBottom: 5 }}
    >
      <div>
        <img
          style={{ width: "100%", height: 240, objectFit: "contain" }}
          src={product.image}
          alt=""
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.title.slice(0, 26)}...
        </Typography>
        <span style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          {renderStars()}
        </span>
      </CardContent>
      <CardActions className="card-btns">
        <Button onClick={addToCart} size="small" className="cart-btn">
          ADD TO CART
        </Button>
        <Button
          className="view-btn"
          size="small"
          onClick={() => viewDetail(product.id)}
        >
          View Details
        </Button>
      </CardActions>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Added to cart!"
      />
    </Card>
  );
}
