import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import UsersList from "../../components/Users";
import UserInfo from "../../components/UserInfo";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
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
      </div>
      <hr className="border-slate-300 mb-6" />
      <button
        onClick={() => navigate("/users/form")}
        className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
      >
        Novo
      </button>
      <UsersList
        users={users}
        setConfirmDelete={setConfirmDelete}
        setUserIdToDelete={setUserIdToDelete}
        onInfo={setSelectedUserId}
      /> 
      {confirmDelete && (
        <div className="fixed inset-0 bg-current/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 min-w-[300px] relative">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
              Confirmar Exclusão
            </h2>
            <p className="text-slate-600 mb-6">
              Tem certeza que deseja excluir este usuário?
            </p>
            <div className="flex justify-center gap-4"> 
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-300 text-gray-800 font-semibold rounded px-4 py-2 hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteUser(userIdToDelete);
                  setConfirmDelete(false);
                  setUserIdToDelete(null);
                }}
                className="bg-red-600 text-white font-semibold rounded px-4 py-2 hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
        )}

      {selectedUserId && (
        <div className="fixed inset-0 bg-current/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 min-w-[300px] relative">
            <UserInfo id={selectedUserId} back={setSelectedUserId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
