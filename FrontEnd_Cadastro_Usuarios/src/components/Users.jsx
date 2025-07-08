import "../index.css";
import { Trash2 } from "lucide-react";

function UsersList({ users, deleteUser }) {
  return (
    <div>
      <div className="mt-6 flex flex-col gap-4">
        {users.length === 0 ? (
          <div className="text-slate-400 text-center">
            Nenhum usuário cadastrado ainda.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center w-full p-4 border-b border-slate-300 bg-slate-50 rounded"
            >
              <div>
                <p>
                  <strong>Nome:</strong> {user.nome}
                </p>
                <p>
                  <strong>Idade:</strong> {user.idade}
                </p>
                <p>
                  <strong>E-mail:</strong> {user.email}
                </p>
              </div>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-slate-700 text-white rounded p-2 hover:bg-slate-800 transition"
              >
                <Trash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UsersList;