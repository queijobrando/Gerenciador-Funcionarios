import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function UserInfo({ id, back }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/usuarios/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setUser({ erro: "Não foi possível carregar os dados." });
      }
    }
    fetchUser();
  }, [id]);

  if (!user) return <div>Carregando...</div>;
  if (user.erro) return <div>{user.erro}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
        Informações do Usuário
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Nome
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {user.nome}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Idade
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {user.idade}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Email
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {user.email}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-8 pr-2">
        <button
          onClick={() => navigate(`/users/edit/${id}`)}
          className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
        >
          Editar
        </button>
        <button
          onClick={() => back(null)}
          className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
