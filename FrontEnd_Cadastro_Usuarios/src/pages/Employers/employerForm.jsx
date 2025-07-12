import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import api from "../../services/api";
import Form from "../../components/Form";
import { toast } from "react-toastify";

function EmployerForm() {
  const navigate = useNavigate();

  async function createEmployer(data) {
    try {
      await api.post("/employer/register", data);
      navigate("/employers");
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      toast.error("Erro ao criar funcionário!");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-2">
        Novo Funcionário <UserPlus className="inline mr-2" />
      </h1>
      <hr className="border-slate-300 mb-6" />
      <Form onSubmit={createEmployer} />
    </div>
  );
}

export default EmployerForm;
