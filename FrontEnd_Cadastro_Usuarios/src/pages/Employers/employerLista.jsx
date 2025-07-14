import { useEffect, useState } from "react";
import api from "../../services/api";
import { User, Briefcase, CheckCircle } from "lucide-react";

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lista de Funcionários</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Cabeçalhos */}
      <div className="flex gap-4 mb-2 font-semibold text-gray-700 px-2">
        <div className="w-1/3">Nome</div>
        <div className="w-1/3">Cargo</div>
        <div className="w-1/3">Status</div>
      </div>

      <ul className="space-y-4">
        {employers.map((emp) => (
          <li
            key={emp.id}
            className="p-4 bg-gray-100 rounded-2xl shadow-sm flex gap-4 items-center"
          >
            {/* Nome */}
            <div className="w-1/3 flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow-sm">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{emp.name}</span>
            </div>

            {/* Cargo */}
            <div className="w-1/3 flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow-sm">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{emp.positionName}</span>
            </div>

            {/* Status */}
            <div
              className={`w-1/3 flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-semibold ${getStatusStyle(
                emp.employerStatus
              )}`}
            >
              <CheckCircle className="w-4 h-4" />
              {emp.employerStatus}
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
    </div>
  );
}

export default EmployerLista;
