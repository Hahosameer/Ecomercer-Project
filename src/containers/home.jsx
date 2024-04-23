import React, { useEffect, useState } from "react";
import ButtonAppBar from "../components/topbar/topbar";
import MediaCard from "../components/productCard/ProductCard";
import axios from "axios";
import BasicModal from "../components/basicModal/Modal";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const category = searchParams.get("category")
    if(!category || category === "all"){

      const fetchData = async () => {
        const res = await axios("https://fakestoreapi.com/products");
        try {
          setProducts(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [searchParams]);

  useEffect(() => {
    const category = searchParams.get("category")
    if(category && category !== "all"){

      const fetchData = async () => {
        const res = await axios(`https://fakestoreapi.com/products/category/${category}`);
        try {
          setProducts(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [setSearchParams])

  const viewDetail = async (id) => {
    try {
      const res = await axios(`https://fakestoreapi.com/products/${id}`);
      setSelectedProduct(res.data);
      console.log(res.data);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <ButtonAppBar style={{backgroundColor: "#8bc34a" , position: 'static'}}/>
      <div style={{ padding: 20 }}>

      <BasicModal open={open} handleClose={() => setOpen(false)} selectedProduct={selectedProduct} />
      
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {products.map((product, i) => (
          <MediaCard viewDetail={viewDetail} product={product} key={i}/>
        ))}
        </div>
      </div>
    </div>
  );
}
