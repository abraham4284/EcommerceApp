import React, { useEffect } from "react";
import { CardInfoSA } from "../components/Dashboard/CardInfoSA";
import { StockCritico } from "../components/Dashboard/StockCritico";
import { UseProductos } from "../../context/ProductosContext";

export const Dash = () => {

  const { getProductos } = UseProductos();

  useEffect(()=>{
     getProductos()
  },[])

  return (
    <div className="container">
      <CardInfoSA />
      <StockCritico />
    </div>
  );
};
