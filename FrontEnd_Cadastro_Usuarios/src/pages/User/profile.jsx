import { useEffect, useState } from "react";
import api from "../../services/api";
import { User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/user");
        setUser(res.data);
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        setErro("Não foi possível carregar os dados.");
      }
    }
    fetchUser();
  }, []);

  if (erro) {
    return (
      <div className="p-8">
        <div className="text-red-600">{erro}</div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-300 text-gray-800 font-semibold rounded px-4 py-2 hover:bg-gray-400 transition"
        >
          Voltar
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-slate-600 text-lg">Carregando perfil...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-3xl font-bold text-slate-700 mb-2 flex items-center gap-2">
        <UserIcon className="inline mr-2" />
        Perfil do Usuário
      </h1>
      <hr className="border-slate-300 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-slate-50 shadow-sm">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Nome
          </span>
          <span className="block text-lg text-slate-800 break-words">
            {user.name}
          </span>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 bg-slate-50 shadow-sm">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Email
          </span>
          <span className="block text-lg text-slate-800 break-words">
            {user.email}
          </span>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 bg-slate-50 shadow-sm">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Usuário
          </span>
          <span className="block text-lg text-slate-800 break-words">
            {user.username}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
