import { useEffect, useState } from "react";
import api from "../../services/api";
import AddUser from "../../components/Form";
import UsersList from "../../components/Users";
import { useNavigate } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  async function createUsers({ nome, idade, email }) {
    await api.post("/usuarios", { nome, idade, email });
    getUsers();
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-slate-500 flex justify-center items-start p-6 overflow-auto">
      <div className="flex flex-col gap-8 w-full max-w-2xl">
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl text-slate-700 font-bold text-center mb-4">
            Cadastro de Usuários
          </h1>
          <AddUser createUsers={createUsers} />
        </div>
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <UsersList users={users} deleteUser={deleteUser} />
        </div>
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={() => navigate("/teste")}
            className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
          >
            Ir para a página de teste
          </button>
        </div>
    </div>
  </div>
  );
}

export default Home;