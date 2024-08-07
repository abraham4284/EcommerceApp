import React, { useEffect, useState } from "react";
import "./styles.css";
import { UseProductos } from "../../../context/ProductosContext";
import { TableProductosSA } from "../Productos/TableProductosSA";
import { ModalProductos } from "../Productos/ModalProductos";

export const StockCritico = () => {
  const { productos, updateProductos } = UseProductos();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [stockCritico, setStockCritico] = useState("");

  
 

  const filterStockCritico = productos.filter((datos) => {
    const stockValue = parseInt(stockCritico, 10);
    if (isNaN(stockCritico)) return true;
    return datos.stock < stockValue;
  });

  return (
    <div className="row mt-5">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header bg-ventas text-white">
            Informe de Stock Critico
            <input
              type="number"
              className="form-control form-control-sm"
              style={{
                maxWidth: "60px",
                display: "initial",
                marginLeft: "15px",
              }}
              value={stockCritico}
              onChange={(e) => setStockCritico(e.target.value)}
            />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="table-responsive">
                  {stockCritico.length > 0 ? (
                    filterStockCritico.length > 0 ? (
                      <TableProductosSA datos={filterStockCritico} setDataToEdit={setDataToEdit}/>
                    ) : (
                      <div>
                        <p ><b>No hay stock critico</b></p>
                      </div>
                    )
                  ) : (
                    <div>
                      <p><b>Ingrese un valor</b></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalProductos dataToEdit={dataToEdit} updateProductos={updateProductos}/>
    </div>
  );
};
