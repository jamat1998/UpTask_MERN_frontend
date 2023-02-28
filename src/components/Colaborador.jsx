import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {

    const {handleModalEliminarColaborador}= useProyectos()
  const { nombre, email } = colaborador;
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
        onClick={()=>handleModalEliminarColaborador(colaborador)}
          className="bg-red-600 py-3 px-4 text-white text-sm rounded-lg font-bold"
          type="button"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaborador;
