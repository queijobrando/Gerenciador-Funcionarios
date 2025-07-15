import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function EmployerInfo({ id, back }) {
  const [employer, setEmployer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployer() {
      try {
        const res = await api.get(`/employer/${id}`);
        setEmployer(res.data);
      } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
        setEmployer({ erro: "Não foi possível carregar os dados." });
      }
    }
    fetchEmployer();
  }, [id]);

  if (!employer) return <div>Carregando...</div>;
  if (employer.erro) return <div>{employer.erro}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
        Informações do Funcionário
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Nome
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.name}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Idade
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.birthdate}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Email
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.email}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Admissão
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.hiredate}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            CPF
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.cpf}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Contato
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.contact}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Logradouro
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.logradouro}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Numero
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.numero}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Numero
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.bairro}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Numero
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.cidade}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            Numero
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.estado}
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-slate-50 shadow-sm min-w-0 w-full">
          <span className="block text-slate-500 text-sm font-semibold mb-1">
            CEP
          </span>
          <span className="block text-lg text-slate-800 break-words min-w-0">
            {employer.cep}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-8 pr-2 gap-2">
        <button
          onClick={() => navigate(`/employers/edit/${id}`)}
          className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
        >
          Editar
        </button>
        <button
          onClick={() => back(null)}
          className="bg-gray-300 text-gray-800 font-semibold rounded px-4 py-2 hover:bg-gray-400 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default EmployerInfo;
