import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/clienteAxios'

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const comprobrarToken = async () => {
      try {
        await clienteAxios(
          `/usuarios/olvide-password/${token}`
        );
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobrarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe ser minimo de 6 caracteres",
        error: TransformStreamDefaultController,
      });
      return;
    }
    try {
      const url = `/usuarios/olvide-password/${token}`

      const {data} = await clienteAxios.post(url,{
        password
      })
      setAlerta({
        msg:data.msg,
        error:false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Restablece tu password y no pierdas acceso{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          action=""
          className="my-10 bg-white shadow rounded-lg p-10"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="bg-sky-700 w-full py-3 text-white mb-5 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            value="Guardar Nuevo Password"
            name=""
            id=""
          />
        </form>
      )}
             {passwordModificado && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia Sesion.
          </Link>
        )}
    </>
  );
};

export default NuevoPassword;
