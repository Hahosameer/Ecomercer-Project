import React, { useContext, useEffect, useState } from "react"; // Import React
import ResponsiveDrawer from "../../components/topbar/topbar";
import TextField from "@mui/material/TextField";
import "./checkout.css";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import CartContext from "../../components/contexts/cart";

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { cart, setCart } = useContext(CartContext);

  const placeOrder = () => {
    const user = {
      name,
      email,
      address,
      phone
    };

    axios
      .post("http://localhost:5000/order", { user, cart })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ResponsiveDrawer className="checktopbar" />
      <Box
        sx={{
          flexGrow: 1,
          width: "50%",
          margin: "0 auto",
          marginTop: 5,
          display: "flex",
          flexDirection: "column", // Change direction to column
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignContent="center"
        >
          <Grid item xs={12}>
            <h2 style={{ textAlign: "center" }}>CHECKOUT</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              id="FullName"
              label="Full name"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "#8bc34a" },
                  "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                },
                "& .MuiFormLabel-root": {
                  color: "black",
                  "&.Mui-focused": { color: "#8bc34a" },
                },
                width: "100%", // Set width to 100%
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              id="Phone"
              label="Phone"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "#8bc34a" },
                  "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                },
                "& .MuiFormLabel-root": {
                  color: "black",
                  "&.Mui-focused": { color: "#8bc34a" },
                },
                width: "100%", // Set width to 100%
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              id="email"
              label="Email"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "#8bc34a" },
                  "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                },
                "& .MuiFormLabel-root": {
                  color: "black",
                  "&.Mui-focused": { color: "#8bc34a" },
                },
                width: "100%", // Set width to 100%
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
              id="Address"
              label="Address"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "#8bc34a" },
                  "&.Mui-focused fieldset": { borderColor: "#8bc34a" },
                },
                "& .MuiFormLabel-root": {
                  color: "black",
                  "&.Mui-focused": { color: "#8bc34a" },
                },
                width: "100%", // Set width to 100%
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="small"
              className="cart-btn chackoutBtn"
              onClick={placeOrder}
            >
              PLACE ORDER
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
