import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import CompanyForm from "../../components/company/CompanyForm";
import { toast } from "react-toastify";

function CompanyFormPage() {
  const navigate = useNavigate();

  async function createCompany(data) {
    try {
      const response = await api.post("/company/register", data);
      toast.success("Empresa criada com sucesso!");
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao criar empresa:", error);
      toast.error("Erro ao criar empresa!");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-2">Criar Empresa</h1>
      <hr className="border-slate-300 mb-6" />
      <CompanyForm onSubmit={createCompany} />
    </div>
  );
}

export default CompanyFormPage;
