import { useContext, createContext, useState, useEffect } from "react";
import {
  getUsuarios,
  loginUsuario,
  verifyTokenRequest,
  createUsuarios,
  createUsuariosSuperAdminRequest,
  updateUsuariosRequest,
  getIdUsuariosRequest,
} from "../Api/Autentificacion";
import Cookies from "js-cookie";
import { Spiner } from "../components/Spiner";
import {
  createDomiciliosUsers,
  deleteDomiciliosRequest,
  getIdDomiciliosRequest,
  updateDomiciliosRequest,
} from "../Api/domicilios";

const AuthContext = createContext();

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return new Error("El UseAuth esta fuera del contexto");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosAll, setUsuariosAll] = useState([]);
  const [usuarioIndividual, setUsuarioIndividual] = useState([]);
  const [isAutenticated, setisAutenticated] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUserIndividual, setLoadingUserIndividual] = useState(true);

  const [domiciliosUser, setDomiciliosUser] = useState([]);
  const [errorDomicilios, setErrorDomicilios] = useState(null);
  const [loadingDomicilios, setLoadingDomicilios] = useState(true);

  const registro = async (dataUser) => {
    try {
      const { data } = await createUsuarios(dataUser);
      if (data) {
        console.log(data);
        setUsuarios(data);
        setisAutenticated(true);
        setError(null);
        setLoading(false);
      } else {
        setUsuarios(null);
        setisAutenticated(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "Soy el error");
      setError(error.response.data.message);
      console.log("Error en la funcion Registro");
    }
  };

  const registroSuperAdmin = async (dataUser) => {
    try {
      const { data } = await createUsuariosSuperAdminRequest(dataUser);
      if (data) {
        console.log(data);
        setUsuarios(data);
        setisAutenticated(true);
        setError(null);
        setLoading(false);
      } else {
        setUsuarios(null);
        setisAutenticated(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "Soy el error");
      setError(error.response.data.message);
      console.log("Error en la funcion Registro SuperAdmin");
    }
  };

  const login = async (usuario) => {
    try {
      const { data } = await loginUsuario(usuario);
      if (!data) {
        setUsuarios(null);
        setisAutenticated(false);
        setLoading(false);
      } else {
        console.log(data);
        setUsuarios(data);
        setisAutenticated(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      console.log("Error en la funcion login AuthContext");
    }
  };

  const updateUsuarios = async (id, dataUser) => {
    try {
      const { data } = await updateUsuariosRequest(id, dataUser);
      if (!data) {
        setUsuariosAll(null);
        setisAutenticated(false);
        setLoading(false);
      }
      let newData = usuariosAll.map((el) =>
        el.idusuarios === id ? dataUser : el
      );
      setUsuariosAll(newData);
      setisAutenticated(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      console.log("Error en la funcion updateUsuarios Context");
    }
  };

  const getUsuariosAll = async () => {
    try {
      const { data } = await getUsuarios();
      if (!data) {
        setisAutenticated(false);
      }
      setUsuariosAll(data);
      setisAutenticated(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      console.log("Error en la funcion login getUsuarios");
    }
  };

  const getIdUsuarios = async (id) => {
    try {
      const { data } = await getIdUsuariosRequest(id);
      if (!data) {
        setLoadingUserIndividual(false);
        setisAutenticated(false);
      }
      setUsuarioIndividual(data);
      setisAutenticated(true);
      setLoadingUserIndividual(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      console.log("Error en la funcion getIdUsuarios Context");
    }
  };

  // Domicilios

  const getIdDomicliosUser = async (id) => {
    try {
      const { data } = await getIdDomiciliosRequest(id);
      console.log(data);
      if (!data) {
        setLoading(false);
      }
      setDomiciliosUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      console.log("Error en la funcion getIdUsuarios Context");
    }
  };

  const createDomicilios = async (dataDomicilio) => {
    try {
      const { data } = await createDomiciliosUsers(dataDomicilio);
      if (!data) {
        setLoadingDomicilios(false);
      }
      setDomiciliosUser((prevDomicilios) => [...prevDomicilios, data]);
      setLoading(false);
      setErrorDomicilios(null);
    } catch (error) {
      setErrorDomicilios(error.response.data.message);
      console.log("Error en la funcion createDomicilios Context");
    }
  };

  const updateDomicilios = async (id, dataDomicilio) => {
    try {
      const { data } = await updateDomiciliosRequest(id, dataDomicilio);
      if (!data) {
        setLoadingDomicilios(false);
      }
      let newData = domiciliosUser.map((el) =>
        el.idDomicilio === id ? dataDomicilio : el
      );
      setDomiciliosUser(newData);
      setLoadingDomicilios(false);
    } catch (error) {
      setErrorDomicilios(error.response.data.message);
      console.log("Error en la funcion updateDomicilios Context");
    }
  };

  const deleteDomicilios = async (id) => {
    try {
      const { data } = await deleteDomiciliosRequest(id);
      if (!data) {
        setLoadingDomicilios(false);
      }
      let newData = domiciliosUser.filter((el) => el.idDomicilio !== id);
      setDomiciliosUser(newData);
      setLoadingDomicilios(false);
    } catch (error) {
      setErrorDomicilios(error.response.data.message);
      console.log("Error en la funcion deleteDomiclios Context");
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const logout = () => {
    Cookies.remove("token");
    setisAutenticated(false);
    setUsuarios(null);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setisAutenticated(false);
        setLoading(false);
        setUsuarios(null);
        return;
      }
      try {
        const { data } = await verifyTokenRequest(cookies.token);
        console.log(data, "checkLogin AutContext");
        if (!data) {
          setisAutenticated(false);
          setLoading(false);
          setUsuarios(null);
        } else {
          setisAutenticated(true);
          setUsuarios(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        console.log("Error funcion CheckLogin AuthContext");
        setisAutenticated(false);
        setLoading(false);
        setUsuarios(null);
      }
    };
    checkLogin();
  }, []);

  if (loading) {
    return <Spiner />;
  }

  return (
    <AuthContext.Provider
      value={{
        usuarios,
        isAutenticated,
        loading,
        error,
        usuariosAll,
        usuarioIndividual,
        domiciliosUser,
        login,
        logout,
        getUsuariosAll,
        registro,
        registroSuperAdmin,
        updateUsuarios,
        getIdUsuarios,
        loadingUserIndividual,

        // Domicilios
        getIdDomicliosUser,
        createDomicilios,
        updateDomicilios,
        deleteDomicilios,
      }}
    >
      {loading ? <Spiner /> : children}
    </AuthContext.Provider>
  );
};
