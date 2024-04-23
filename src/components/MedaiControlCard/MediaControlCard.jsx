import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export default function MediaControlCard({ selectedProduct }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      let starColor = i < selectedProduct.rating.rate ? "#ffd700" : "#9e9e9e"; // Change star color based on rating
      stars.push(
        <div key={i} style={{ display: "inline-block", marginRight: 2 }}>
          <StarBorderIcon style={{ color: starColor, fontSize: 18 }} />
        </div>
      );
    }
    return stars;
  };

  return (
    <Card sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      {" "}
      {/* Conditional flex direction */}
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", sm: 300, objectFit: "contain" },
          marginBottom: { xs: 2, sm: 0 },
        }} // Adjust image width and margin based on screen size
        image={selectedProduct.image}
        alt="Product image"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: { xs: 0, sm: 2 },
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        {" "}
        {/* Conditional margin and alignment */}
        <CardContent
          sx={{ flex: "1 0 auto", textAlign: { xs: "center", sm: "left" } }}
        >
          {" "}
          {/* Conditional text alignment */}
          <Typography variant="h5" component="div">
            {selectedProduct.title}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {selectedProduct.description.slice(1 , 80)}
          </Typography>
          {renderStars()}
          <Typography variant="h6" component="div">
            Rs {selectedProduct.price}/-
          </Typography>
          <div style={{ margin: 10, marginBottom: 10 }}>
            <Chip label={selectedProduct.category} />
          </div>
          <div style={{ marginTop: 6 }}>
            <Button size="small" className="cart-btn">
              ADD TO CART
            </Button>
            <Button className="view-btn" size="small" style={{ marginLeft: 5 }}>
              BUY NOW
            </Button>
          </div>
        </CardContent>
      </Box>
    </Card>
  );
}
