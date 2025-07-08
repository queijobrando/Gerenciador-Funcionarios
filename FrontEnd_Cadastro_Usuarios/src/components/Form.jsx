import { useRef } from "react";

function AddUser({ createUsers }) {
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    createUsers({
      nome: inputName.current.value,
      idade: inputAge.current.value,
      email: inputEmail.current.value,
    });
    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" ref={inputName} placeholder="Nome" className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
      <input type="number" ref={inputAge} placeholder="Idade" className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
      <input type="" ref={inputEmail} placeholder="Email" className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
      <button type="submit" className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition">Cadastrar</button>
    </form>
  );
}

export default AddUser;