import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-slate-800 text-white flex flex-col shadow-lg z-20">
      <div className="p-6 text-2xl font-bold border-b border-slate-700 mb-4">
        Meu Menu
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4">
        <Link
          to="/"
          className="py-2 px-3 rounded hover:bg-slate-700 transition"
        >
          Home
        </Link>
        <Link
          to="/teste"
          className="py-2 px-3 rounded hover:bg-slate-700 transition"
        >
          Página de Teste
        </Link>
        {/* Adicione mais links conforme necessário */}
      </nav>
    </aside>
  );
}

export default Sidebar;