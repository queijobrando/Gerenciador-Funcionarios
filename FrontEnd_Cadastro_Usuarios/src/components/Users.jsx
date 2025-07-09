import "../index.css";
import { Info, Trash2 } from "lucide-react";

function UsersList({ users, setConfirmDelete, onInfo, setUserIdToDelete }) {
  return (
    <div className="mt-6">
      {users.length === 0 ? (
        <div className="text-slate-400 text-center">
          Nenhum usuário cadastrado ainda.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-slate-50 rounded border border-slate-300">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="px-4 py-2 text-left ">Nome</th>
                <th className="px-4 py-2 text-left">Idade</th>
                <th className="px-4 py-2 text-left">E-mail</th>
                <th className="px-4 py-2 text-left">Ação</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-200">
                  <td className="px-4 py-2">{user.nome}</td>
                  <td className="px-4 py-2">{user.idade}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onInfo(user.id)}
                        className="bg-slate-500 text-white rounded p-2 cursor-pointer hover:bg-slate-600 transition"
                        title="Informações"
                      >
                        <Info />
                      </button>
                      <button
                        onClick={() => {
                          setUserIdToDelete(user.id);
                          setConfirmDelete(true);
                        }}
                        className="bg-slate-700 text-white rounded p-2 cursor-pointer hover:bg-slate-800 transition"
                        title="Excluir"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersList;
