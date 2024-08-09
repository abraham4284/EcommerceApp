import axios from "axios";
import React, { useEffect, useState } from "react";
// import { UsuariosSA } from "../components/Usuarios/UsuariosSA";
import "../components/Dashboard/styles.css";
import { UseAuth } from "../../context/AuthProvider";
import { TablePersonailzada } from "../../components/TablePersonailzada";


export const HomeSuperAdmin = () => {
  // const [usuarios, setUsuarios] = useState([]);
  const { usuarios, usuariosAll, getUsuariosAll } = UseAuth();
  const [filterUserSearch, setFilterUserSearch] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      await getUsuariosAll();
    };
    getUsuarios();
  }, []);

  const titles = [
    { key: "apellido", title: "Apellido" },
    { key: "nombre", title: "Nombre" },
    { key: "username", title: "Username" },
    { key: "rol", title: "Rol" },
  ];

  const filterUsers = usuariosAll.filter(el=> el.username !== usuarios.username);

  const handleSearchUsers = (e)=>{
    e.preventDefault();
    const searchInputUser = e.target.value.toLocaleLowerCase();
    if(searchInputUser === ""){
      setFilterUserSearch(filterUsers)
    }
    const filterUsersFind = filterUsers.filter((el)=>{
      return (
        el.rol.toLocaleLowerCase().includes(searchInputUser) ||
        el.nombre.toLocaleLowerCase().includes(searchInputUser) ||
        el.apellido.toLocaleLowerCase().includes(searchInputUser) ||
        el.username.toLocaleLowerCase().includes(searchInputUser)
      )
    })
    setFilterUserSearch(filterUsersFind);
  }

  const data = filterUserSearch.length > 0 ? filterUserSearch : filterUsers

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="card w-75 mb-3 bg-ventas text-white">
            <div className="card-body">
              <h5 className="card-title">Bienvenido {usuarios.username}</h5>
              <p className="card-text mt-3">
                <i className="fa-solid fa-user-tie"></i> {usuarios.username}
              </p>
              <p className="card-text">
                <i className="fa-solid fa-briefcase"></i> {usuarios.rol}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 ms-5">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}
                >
                  Usuarios
                </div>
                <div className="card-body ">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label form="nro_documento">Buscar Admin</label>
                        <input
                          type="text"
                          className="form-control form-control-xl"
                          placeholder="Ingrese nombre de un cliente"
                          onChange={handleSearchUsers}
                        />
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {/* <UsuariosSA datos={usuarios} /> */}
              <div className="card">
                <div className="card-body text-center">
                  <TablePersonailzada
                    data={data}
                    columns={titles}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
