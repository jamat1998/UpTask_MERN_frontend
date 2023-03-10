import { useState } from "react";
import { Link } from "react-router-dom";
import  Alerta  from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e=>{
    e.preventDefault();

    if(email === '' || email.length < 6) {
      setAlerta({
        msg:'El email es obligatorio',
        error:true
      })
      return
    }
    
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email}
      )

      setAlerta({
        msg:data.msg,
        error:false
      })

    } catch (error) {
      
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
      
    }
  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Reestable Tu Password y No Pierdas Acceso A Tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form
        onSubmit={handleSubmit}
        action=""
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-sky-700 w-full py-3 text-white mb-5 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          value="Enviar Instrucciones"
          name=""
          id=""
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ??Ya tienes una cuenta? Inicia Sesion.
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          ??No tienes una cuenta? Registrate.
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
