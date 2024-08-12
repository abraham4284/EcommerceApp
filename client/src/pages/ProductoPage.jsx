import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatearNumero } from "../helpers/FormatearNumero";
import { UseCarrito } from "../context/CarritoContext";
import { UseProductos } from "../context/ProductosContext";
import { SpinderDetalles } from "../components/SpinderDetalles";

export const ProductoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCarrito, deleteProducto, chekingProductoCarrito } = UseCarrito();
  const {
    getIdProductos,
    productoIndividual,
    loadingProductoIndividual,
    setLoadingProductoIndividual,
    setProductoIndividual,
    getProductos
  } = UseProductos();

  useEffect(() => {
    const getProductoFetchId = async (id) => {
      setLoadingProductoIndividual(true);
      setProductoIndividual([]);
      await getIdProductos(id);
      await getProductos();
      setLoadingProductoIndividual(false);
    };
    getProductoFetchId(id);
  }, [id]);


  const handleNavigate = () => {
    navigate(-1);
  };

  const productoEncontrado =
    productoIndividual && chekingProductoCarrito(productoIndividual);

  return (
    <>
      {loadingProductoIndividual ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "250px" }}
        >
          <SpinderDetalles />
        </div>
      ) : (
        <div className="card mb-3 m-auto mt-5" style={{ maxWidth: "1000px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={productoIndividual.img}
                className="img-fluid rounded-start"
                alt={productoIndividual.nombre}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{productoIndividual.nombre}</h5>
                <p className="card-text mt-3">
                  {productoIndividual.descripcion}
                </p>
                <h4 className="card-text mt-4">
                  {formatearNumero(productoIndividual.precio)}
                </h4>
                <div className="d-flex gap-2">
                  {productoEncontrado ? (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deleteProducto(productoIndividual.idproductos)
                      }
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCarrito(productoIndividual)}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  )}
                  <button className="btn btn-warning" onClick={handleNavigate}>
                    <i className="fa-solid fa-right-long fa-rotate-180"></i>
                  </button>
                  {productoEncontrado ? (
                    <Link
                      className="btn btn-outline-info"
                      title="Ver Carrito"
                      to={"/carrito"}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
