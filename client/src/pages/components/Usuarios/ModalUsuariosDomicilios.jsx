import React, { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import { UseAuth } from "../../../context/AuthProvider";
import Swal from "sweetalert2";

const initialForm = {
  idDomicilio: null,
  codigoPostal: "",
  calle: "",
  numero: "",
  descripcion: "",
  idusuarios: "",
};

export const ModalUsuariosDomicilios = ({ dataToEdit, setDataToEdit }) => {
  const { formState, onResetForm, onInputChange, setFormState } =
    useForm(initialForm);
  const { codigoPostal, calle, numero, descripcion } = formState;
  const { usuarios, createDomicilios, updateDomicilios } = UseAuth();

  useEffect(() => {
    if (dataToEdit) {
      setFormState(dataToEdit);
    } else {
      setFormState(initialForm);
    }
  }, [dataToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formState.idusuarios = usuarios.idusuarios;
    if (
      !formState.codigoPostal ||
      !formState.calle ||
      !formState.numero ||
      !formState.descripcion
    ) {
      Swal.fire({
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
      return;
    }
    if (formState.idDomicilio === null) {
      createDomicilios(formState);
    } else {
      updateDomicilios(formState.idDomicilio, formState);
    }
  };

  return (
    <div
      className="modal fade"
      id="modalDomicilios"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#4e73df", color: "white" }}
          >
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {dataToEdit ? "Editar Domicilio" : "Crear Domicilio"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Codigo postal
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese codigo postal"
                  name="codigoPostal"
                  value={codigoPostal}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Calle
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese nombre de calle"
                  name="calle"
                  value={calle}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Numero
                </label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Ingrese numero de calle"
                  name="numero"
                  value={numero}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Descripcion
                </label>
                <textarea
                  type="text"
                  className="form-control "
                  placeholder="Ingrese descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={onInputChange}
                />
              </div>

              <div className="modal-footer">
                  <button
                    type="submit"
                    className={
                      dataToEdit ? "btn btn-warning" : "btn btn-success"
                    }
                    data-bs-dismiss="modal"
                  >
                    {dataToEdit ? (
                      <span>
                        {" "}
                        <i className="fa-regular fa-pen-to-square"></i>{" "}
                        Confirmar
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <i className="fa-solid fa-plus"></i> Crear
                      </span>
                    )}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-danger"
                    onClick={()=>{
                      onResetForm()
                      setDataToEdit(null)
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-xmark"></i> Cancelar
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
