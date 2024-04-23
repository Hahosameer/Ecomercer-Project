import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Button, useMediaQuery } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../contexts/cart";
import AnchorTemporaryDrawer from "../drawer/Drawer";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, productRating } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { cart, setCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = React.useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen((prevMobileOpen) => !prevMobileOpen);
    }
  };

  const handleCategoryClick = (category) => {
    setSearchParams({ category: category.toLowerCase() });
    navigate(`/?category=${category.toLowerCase()}`); // Navigate to the corresponding URL
    setMobileOpen(false); // Close the drawer after clicking on a category
  };

  // delete cart
  const deleteCart = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartData.findIndex((v) => v.id === id);
    cartData.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart(cartData);
  };

  const updateQty = (type, id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartData.findIndex((v) => v.id === id);
    if (type === "+") {
      cartData.splice(index, 1, {
        ...cartData[index],
        qty: cartData[index].qty + 1,
      });
    } else {
      cartData.splice(index, 1, {
        ...cartData[index],
        qty: cartData[index].qty - 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart(cartData);
    console.log(type, id);
  };
  const navItems = [
    "ALL",
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
  ];

  const drawer = (
    <Box>
      <Toolbar style={{ backgroundColor: "#8bc34a" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, textAlign: "center", color: "#fff" }}
        >
          SMIT STORE
        </Typography>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(item)}>
              <ListItemText primary={item} style={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: "#8bc34a", position: "static" }}>
        <Toolbar>
          {isSmallScreen ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              SMIT STORE
            </Typography>
          )}
          {!isSmallScreen && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                component="span"
                sx={{ marginRight: "10px" }} // Use sx instead of style
              >
                {productRating}
              </Typography>
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    navigate(`/?category=${item.toLowerCase()}`, {});

                    // setSearchParams({ category: item.toLowerCase() })
                  }}
                  color="inherit"
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
          <Box>
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          <AnchorTemporaryDrawer
            updateQty={updateQty}
            deleteCart={deleteCart}
            cartData={cart}
            open={open}
            setOpen={setOpen}
          />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
