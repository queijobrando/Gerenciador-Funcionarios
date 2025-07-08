import { Link, useLocation } from "react-router-dom";
import { Home, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [openUsers, setOpenUsers] = useState(false);
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-slate-800 text-white flex flex-col shadow-lg z-20">
      <div className="p-6 text-2xl font-bold border-b border-slate-700 mb-4">
        Meu Menu
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4">
        <Link
          to="/"
          className="py-2 px-3 rounded hover:bg-slate-700 transition flex items-center"
        >
          <Home className="inline mr-2" />
          Home
        </Link>
        {/* Usuários com submenu */}
        <button
          onClick={() => setOpenUsers((prev) => !prev)}
          className="py-2 px-3 rounded hover:bg-slate-700 transition flex items-center w-full text-left"
        >
          <Users className="inline mr-2" />
          Usuários
          {openUsers ? (
            <ChevronUp className="ml-auto" size={18} />
          ) : (
            <ChevronDown className="ml-auto" size={18} />
          )}
        </button>
        {openUsers && (
          <div className="ml-7 flex flex-col gap-1">
            <Link
              to="/users"
              className={`py-1 px-2 rounded hover:bg-slate-700 transition ${
                location.pathname === "/users" ? "bg-slate-700" : ""
              }`} // pra deixar cinza quando estiver na rota
            >
              Todos Usuários
            </Link>
            <Link
              to="/users/form"
              className={`py-1 px-2 rounded hover:bg-slate-700 transition ${
                location.pathname === "/users/form" ? "bg-slate-700" : ""
              }`}
            >
              Novo Usuário
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;