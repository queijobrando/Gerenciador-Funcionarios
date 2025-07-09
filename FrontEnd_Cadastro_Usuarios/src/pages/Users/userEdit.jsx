import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Form from "../../components/Form";

function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState({
    nome: "",
    idade: "",
    email: "",
  });

  useEffect(() => {
    async function fetchUser() {
      const { data } = await api.get(`/usuarios/${id}`);
      setFields({
        nome: data.nome || "",
        idade: data.idade || "",
        email: data.email || "",
      });
      setLoading(false);
    }
    fetchUser();
  }, [id]);

  async function updateUser(updatedFields) {
    await api.put(`/usuarios/edit/${id}`, updatedFields);
    navigate("/users");
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-2">Editar Usuário</h1>
      <hr className="border-slate-300 mb-6" />
      <Form
        onSubmit={updateUser}
        initialFields={fields}
        submitLabel="Salvar"
      />
    </div>
  );
}

export default UserEditPage;