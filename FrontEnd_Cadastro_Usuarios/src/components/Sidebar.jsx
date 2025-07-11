import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  ChevronDown,
  ChevronUp,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { logout, getDecodedToken } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [openEmployers, setOpenEmployers] = useState(false);
  const [userName, setUserName] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const decodedToken = getDecodedToken();
    setUserName(decodedToken.sub || "Usuário");
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-slate-800 text-white flex flex-col shadow-lg z-20">
      <div className="p-6 text-2xl font-bold border-b border-slate-700 mb-4">
        <Link
          to="/profile"
          className="flex gap-2 items-center cursor-pointer hover:underline"
        >
          <CircleUserRound />
          {userName}
        </Link>
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
          onClick={() => setOpenEmployers((prev) => !prev)}
          className="py-2 px-3 rounded hover:bg-slate-700 transition flex items-center w-full text-left"
        >
          <Users className="inline mr-2" />
          Funcionários
          {openEmployers ? (
            <ChevronUp className="ml-auto" size={18} />
          ) : (
            <ChevronDown className="ml-auto" size={18} />
          )}
        </button>
        {openEmployers && (
          <div className="ml-7 flex flex-col gap-1">
            <Link
              to="/employers"
              className={`py-1 px-2 rounded hover:bg-slate-700 transition ${
                location.pathname === "/employers" ? "bg-slate-700" : ""
              }`} // pra deixar cinza quando estiver na rota
            >
              Todos Funcionários
            </Link>
            <Link
              to="/employers/form"
              className={`py-1 px-2 rounded hover:bg-slate-700 transition ${
                location.pathname === "/employers/form" ? "bg-slate-700" : ""
              }`}
            >
              Novo Funcionário
            </Link>
          </div>
        )}
      </nav>
      <div className="mt-auto px-4 pb-6">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-slate-700 hover:bg-slate-600 transition font-semibold"
        >
          Logout <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
