import React, { useEffect, useState } from "react";
import { UsuariosSA } from "../../components/Usuarios/UsuariosSA";
import { UseAuth } from "../../../context/AuthProvider";
import { ModalUsuarios } from "../../components/Usuarios/ModalUsuarios";

export const UsuariosPagesSA = () => {
  
  const { usuariosAll, getUsuariosAll, usuarios } = UseAuth();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [filterUserSearch, setFilterUserSearch] = useState([]);

  useEffect(() => {
    getUsuariosAll()
  }, []);

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
    <div className="container mt-3 ms-5">
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}
                >
                  Clientes
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label form="nro_documento">Buscar clientes</label>
                        <input
                          type="text"
                          className="form-control form-control-xl"
                          placeholder="Ingrese nombre de un cliente"
                          onChange={handleSearchUsers}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 mt-4">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={()=> getUsuariosAll()}
                        >
                          <i className="fa-solid fa-arrows-rotate"></i> Refrescar
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
              <UsuariosSA datos={data} setDataToEdit= {setDataToEdit}/>
            </div>
          </div>
        </div>
      </div>
      <ModalUsuarios dataToEdit = {dataToEdit} setDataToEdit = {setDataToEdit} />
    </div>
  );
};
