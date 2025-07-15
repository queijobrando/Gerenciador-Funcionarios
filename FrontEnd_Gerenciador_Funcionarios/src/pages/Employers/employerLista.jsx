import { useEffect, useState } from "react";
import api from "../../services/api";
import { User, Briefcase, CheckCircle, Info, Trash2 } from "lucide-react";
import EmployerInfo from "../../components/EmployerInfo";

// Função para definir a cor do status dinamicamente
const getStatusStyle = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-800";
    case "ON_VACATION":
      return "bg-yellow-100 text-yellow-800";
    case "INACTIVE":
      return "bg-gray-200 text-gray-700";
    case "SICK_LEAVE":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

function EmployerLista() {
  const [employers, setEmployers] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);
  const [employerIdToDelete, setEmployerIdToDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const loadEmployers = async (page = 1, name = "") => {
    try {
      const response = await api.get("/employer/all", {
        params: { page, name },
      });
      setEmployers(response.data.content);
      setPageInfo(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  useEffect(() => {
    loadEmployers(currentPage, nameFilter);
  }, [currentPage, nameFilter]);

  async function deleteEmployer(id) {
    await api.delete(`/employer/${id}`);
    loadEmployers(currentPage, nameFilter);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-700 mb-2">
        Lista de Funcionários
      </h1>
      <hr className="border-slate-300 mb-6" />
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64 border border-gray-300 p-2 rounded focus:outline-none "
        />
      </div>

      {/* Cabeçalhos */}
      <div className="flex gap-4 mb-2 font-semibold text-slate-700 px-2">
        <div className="w-1/4">Nome</div>
        <div className="w-1/4">Cargo</div>
        <div className="w-1/4">Status</div>
        <div className="w-1/4 text-center">Ações</div>
      </div>

      <ul className="space-y-4">
        {employers.map((emp) => (
          <li
            key={emp.id}
            className="p-4 bg-gray-100 rounded-2xl shadow-sm flex gap-4 items-center"
          >
            {/* Nome */}
            <div className="w-1/4 flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow-sm">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{emp.name}</span>
            </div>

            {/* Cargo */}
            <div className="w-1/4 flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow-sm">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{emp.positionName}</span>
            </div>

            {/* Status */}
            <div
              className={`w-1/4 flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-semibold ${getStatusStyle(
                emp.employerStatus
              )}`}
            >
              <CheckCircle className="w-4 h-4" />
              {emp.employerStatus}
            </div>

            {/* Ações */}
            <div className="w-1/4 flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow-sm">
              <button
                onClick={() => setSelectedEmployerId(emp.id)}
                className="bg-slate-700 text-white rounded p-2 cursor-pointer hover:bg-slate-900 transition"
                title="Informações"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setEmployerIdToDelete(emp.id);
                  setConfirmDelete(true);
                }}
                className="bg-red-600 text-white rounded p-2 cursor-pointer hover:bg-red-700 transition"
                title="Excluir"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginação */}
      {pageInfo && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={pageInfo.first}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-sm text-gray-700">
            Página <strong>{pageInfo.number + 1}</strong> de{" "}
            <strong>{pageInfo.totalPages}</strong>
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={pageInfo.last}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
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

      {/* Modal de Info */}
      {selectedEmployerId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 min-w-[300px] relative">
            <EmployerInfo
              id={selectedEmployerId}
              back={setSelectedEmployerId}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerLista;
