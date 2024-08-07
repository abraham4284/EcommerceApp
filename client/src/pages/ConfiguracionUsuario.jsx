import React, { useEffect, useState } from "react";
import { UseAuth } from "../context/AuthProvider";
import { TableUsuariosDomicilios } from "./components/Usuarios/TableUsuariosDomicilios";
import { ModalUsuariosDomicilios } from "./components/Usuarios/ModalUsuariosDomicilios";

export const ConfiguracionUsuario = () => {
  const { usuarios, getIdUsuarios, usuarioIndividual, getIdDomicliosUser, domiciliosUser, deleteDomicilios, loading } = UseAuth();
  const { idusuarios } = usuarios;
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    getIdUsuarios(idusuarios);
    getIdDomicliosUser(idusuarios)

  }, []);
  const { apellido, nombre, email, DNI, telefono, username } =
    usuarioIndividual;




  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-center">
          <div className="card w-75 mb-3 bg-ventas text-white">
            <div className="card-body">
              <h5 className="card-title">
                Bienvenido { loading ? "Cargando..." : `${apellido} ${nombre}`}
              </h5>
              <p className="card-text mt-3">
                <i className="fa-solid fa-user"></i> {loading ? "Cargando..." : username}
              </p>
              <p className="card-text">
                <i className="fa-regular fa-envelope"></i> {loading ? "Cargando..." : email}
              </p>
              <p className="card-text">
                <i className="fa-regular fa-address-card"></i> {loading ? "Cargando..." : DNI}
              </p>
              <p className="card-text">
                <i className="fa-solid fa-phone"></i> {loading ? "Cargando..." : telefono}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}
                >
                  Mis direcciones
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label form="nro_documento">Buscar direcciones</label>
                        <input
                          type="text"
                          className="form-control form-control-xl"
                          placeholder="Ingrese el nombre de la calle"
                          
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 mt-4">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDomicilios"
                          onClick={()=> setDataToEdit(null)}
                        >
                          <i className="fas-solid fa fa-plus "></i> Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
               <TableUsuariosDomicilios data={domiciliosUser} setDataToEdit = {setDataToEdit} deleteDomicilios ={deleteDomicilios}/>
            </div>
          </div>
        </div>
        <ModalUsuariosDomicilios dataToEdit = {dataToEdit} setDataToEdit= {setDataToEdit}/>
      </div>
    </div>
  );
};
