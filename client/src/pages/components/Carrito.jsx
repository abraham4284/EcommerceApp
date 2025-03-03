import React, { useEffect, useState } from "react";
import { UseCarrito } from "../../context/CarritoContext";
import { formatearNumero } from "../../helpers/FormatearNumero";
import { sumarTotalesCarrito } from "../../helpers/SumarTotalesCarrito";
import "./styles.css";
import { UseAuth } from "../../context/AuthProvider";
import { CardCarritoCompras } from "./Carrito/CardCarritoCompras";

export const Carrito = () => {
  const {
    carritoCompras,
    deleteProducto,
    counter,
    handleIncrement,
    handleDecrement,
  } = UseCarrito();

  const { totalCarrito } = sumarTotalesCarrito(carritoCompras, counter);
  const { usuarios } = UseAuth();

  const [metodoEnvio, setMetodoEnvio] = useState("retiro"); // Estado para el método de envío

  // align-items-center justify-content-cente
  return (
    <>
      <div className="container ">
        {carritoCompras.map((datos) => (
          <div
            className="row mt-5 align-items-center justify-content-center cont"
            key={datos.idproductos}
          >
            <div className="col-sm-12 col-md-2">
              <div className="cont">
                <img
                  src={datos.img}
                  alt={datos.nombre}
                  style={{ maxWidth: "50px" }}
                />
              </div>
            </div>

            <div className="col-sm-12 col-md-2 mt-2">
              <div className="cont">
                <span>{datos.nombre}</span>
              </div>
            </div>

            <div className="col-sm-12 col-md-2 mt-2 cont-contador">
              <div className="contador">
                <span
                  onClick={() => handleDecrement(datos.idproductos)}
                  style={{ cursor: "pointer" }}
                >
                  -
                </span>
                <span>{counter[datos.idproductos]}</span>
                <span
                  onClick={() => handleIncrement(datos.idproductos)}
                  style={{ cursor: "pointer" }}
                >
                  +
                </span>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 mt-2">
              <span>
                {formatearNumero(
                  datos.precio * (counter[datos.idproductos] || 1)
                )}
              </span>
            </div>
            <div className="col-sm-12 col-md-2 mt-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteProducto(datos.idproductos)}
              >
                <i className="fa-solid fa-trash "></i>
              </button>
            </div>
          </div>
        ))}

        <div
          className="row justify-content-end"
          hidden={carritoCompras.length === 0 ? true : false}
        >
          <div className="col-sm-6 ">
            <CardCarritoCompras
              totalCarrito={totalCarrito}
              direccion={usuarios ? usuarios.direccion : "no hay"}
              metodoEnvio={metodoEnvio}
              setMetodoEnvio={setMetodoEnvio}
            />
          </div>
        </div>
      </div>
    </>
  );
};
