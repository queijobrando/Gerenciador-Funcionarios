import { useNavigate } from "react-router-dom";

function TestePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Página de Teste</h1>
      <div className="w-full bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate("/")}
          className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
        >
          Ir para a página inicial
        </button>
      </div>
    </div>
  );
}

export default TestePage;
