import React from "react";

export const TableUsuariosDomicilios = ({ data = [], setDataToEdit, deleteDomicilios }) => {
  return (
    <div className="card">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>Codigo Postal</th>
              <th>Calle</th>
              <th>Numero</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td>Sin direcciones</td>
              </tr>
            ) : (
              data.map((el) => (
                <tr key={el.idDomicilio} className="text-center">
                  <td>{el.codigoPostal}</td>
                  <td>{el.calle}</td>
                  <td>{el.numero}</td>
                  <td>{el.descripcion}</td>

                  <td className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#modalDomicilios"
                      onClick={() => setDataToEdit(el)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button 
                    className="btn btn-danger"
                    onClick={()=> deleteDomicilios(el.idDomicilio) }
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
