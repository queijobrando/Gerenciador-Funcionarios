import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Register from "../../components/user/Register";
import { toast } from "react-toastify";

function RegisterPage() {
  const navigate = useNavigate();

  async function createUser(data) {
    try {
      await api.post("/auth/register", data);
      toast.success("Usuario criado com sucesso!");
      navigate("/login"); 
    } catch (error) {
      console.error("Erro ao criar usuario:", error);
      toast.error("Erro ao criar usuario!");
    }
  }

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-2xl bg-white p-10 rounded shadow-md">
      <h1 className="text-3xl font-bold text-slate-700 mb-4 text-center">Criar Usuario</h1>
      <Register onSubmit={createUser} />
    </div>
  </div>
);
}

export default RegisterPage;
