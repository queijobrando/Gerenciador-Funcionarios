import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import UsersList from "../../components/Users";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-slate-700">Lista de Usuários</h1>
        <button
          onClick={() => navigate("/users/form")}
          className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
        >
          Novo
        </button>
      </div>
      <hr className="border-slate-300 mb-6" />
      <UsersList users={users} deleteUser={deleteUser} />
    </div>
  );
}

export default UsersPage;