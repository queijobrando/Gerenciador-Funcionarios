import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AddUser from "../../components/Form";

function UserForm() {
  const navigate = useNavigate();

  async function createUsers({ nome, idade, email }) {
    await api.post("/usuarios", { nome, idade, email });
    navigate("/users");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-2">Novo Usuário</h1>
      <hr className="border-slate-300 mb-6" />
      <AddUser createUsers={createUsers} />
    </div>
  );
}

export default UserForm;