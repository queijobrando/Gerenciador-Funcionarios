import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import api from "../../services/api";
import Form from "../../components/Form";

function EmployerForm() {
  const navigate = useNavigate();

  async function createEmployer({ nome, idade, email }) {
    await api.post("/employers", { nome, idade, email });
    navigate("/employers");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-2">Novo Funcionário <UserPlus className="inline mr-2"/></h1>
      <hr className="border-slate-300 mb-6" />
      <Form onSubmit={createEmployer} submitLabel="Cadastrar" />
    </div>
  );
}

export default EmployerForm;