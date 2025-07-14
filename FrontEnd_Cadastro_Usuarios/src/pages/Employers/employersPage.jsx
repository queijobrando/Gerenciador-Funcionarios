import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import api from "../../services/api";
import EmployersList from "../../components/Employers";
import EmployerInfo from "../../components/EmployerInfo";

function EmployersPage() {
  const [employers, setEmployers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);
  const [employerIdToDelete, setEmployerIdToDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  async function getEmployers(page = 1, name = "") {
    const res = await api.get("/employer/all", {
      params: { page: page - 1, name }, // Backend usa páginas baseadas em 0
    });
    console.log("Response data:", res.data); // Debug
    setEmployers(res.data.content);
    setTotalPages(res.data.totalPages);
  }

  useEffect(() => {
    getEmployers(currentPage, search);
  }, [currentPage, search]);

  async function deleteEmployer(id) {
    await api.delete(`/employers/${id}`);
    getEmployers(currentPage, search);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // volta para página 1 ao buscar
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-slate-700">
          <Users className="inline mr-2" />
          Lista de Funcionários
        </h1>
      </div>
      <hr className="border-slate-300 mb-6" />
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded w-full max-w-xs"
        />
        <button
          onClick={() => navigate("/employers/form")}
          className="ml-4 bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
        >
          Novo
        </button>
      </div>
      <EmployersList
        employers={employers}
        setConfirmDelete={setConfirmDelete}
        setEmployerIdToDelete={setEmployerIdToDelete}
        onInfo={setSelectedEmployerId}
      />
      {/* Informações de debug */}
      <div className="mt-4 p-2 bg-gray-100 rounded text-sm text-gray-600">
        <p>Total de funcionários: {employers.length}</p>
        <p>Total de páginas: {totalPages}</p>
        <p>Página atual: {currentPage}</p>
      </div>
      {/* Paginação */}
      {console.log("totalPages:", totalPages, "currentPage:", currentPage)}{" "}
      {/* Debug */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">
              Página {currentPage} de {totalPages}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-slate-700 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Modal de Exclusão */}
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

export default EmployersPage;
