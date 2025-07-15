import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import CompanyForm from "../../components/company/CompanyForm";
import { toast } from "react-toastify";

function CompanyFormPage() {
  const navigate = useNavigate();

  async function createCompany(data) {
    try {
      await api.post("/company/register", data);
      toast.success("Empresa criada com sucesso!");
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao criar empresa:", error);
      toast.error("Erro ao criar empresa!");
    }
  }

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-2xl bg-white p-10 rounded shadow-md">
      <h1 className="text-3xl font-bold text-slate-700 mb-4 text-center">Criar Empresa</h1>
      <CompanyForm onSubmit={createCompany} />
    </div>
  </div>
);
}

export default CompanyFormPage;
