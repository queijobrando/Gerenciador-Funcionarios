import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import api from "../../services/api";
import EmployersList from "../../components/Employers";
import EmployerInfo from "../../components/EmployerInfo";

function EmployersPage() {
  const [employers, setEmployers] = useState([]);
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);
  const [employerIdToDelete, setEmployerIdToDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  async function getEmployers() {
    const usersFromApi = await api.get("/employers");
    setEmployers(usersFromApi.data);
  }

  async function deleteEmployer(id) {
    await api.delete(`/employers/${id}`);
    getEmployers();
  }

  useEffect(() => {
    getEmployers();
  }, []); 

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-slate-700">Lista de Funcionários <Users className="inline mr-2" /></h1>
      </div>
      <hr className="border-slate-300 mb-6" />
      <button
        onClick={() => navigate("/employers/form")}
        className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
      >
        Novo
      </button>
      <EmployersList
        employers={employers}
        setConfirmDelete={setConfirmDelete}
        setEmployerIdToDelete={setEmployerIdToDelete}
        onInfo={setSelectedEmployerId}
      /> 
      {confirmDelete && (
        <div className="fixed inset-0 bg-current/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 min-w-[300px] relative">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
              Confirmar Exclusão
            </h2>
            <p className="text-slate-600 mb-6">
              Tem certeza que deseja excluir este funcionário?
            </p>
            <div className="flex justify-center gap-4"> 
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-300 text-gray-800 font-semibold rounded px-4 py-2 hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteEmployer(employerIdToDelete);
                  setConfirmDelete(false);
                  setEmployerIdToDelete(null);
                }}
                className="bg-red-600 text-white font-semibold rounded px-4 py-2 hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
        )}

      {selectedEmployerId && (
        <div className="fixed inset-0 bg-current/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 min-w-[300px] relative">
            <EmployerInfo id={selectedEmployerId} back={setSelectedEmployerId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployersPage;
