import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditUser() {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({
    nome: "",
    idade: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    nome: false,
    idade: false,
    email: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  // Busca os dados do usuário ao montar
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

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBlur(field, value) {
    setErrors((prev) => ({
      ...prev,
      [field]: !value.trim(),
    }));
  }

  function handleNextStep(e) {
    e.preventDefault();
    const nomeErro = !fields.nome.trim();
    const idadeErro = !fields.idade.trim();
    setErrors((prev) => ({
      ...prev,
      nome: nomeErro,
      idade: idadeErro,
    }));
    if (!nomeErro && !idadeErro) {
      setStep(2);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const emailErro = !fields.email.trim();
    setErrors((prev) => ({
      ...prev,
      email: emailErro,
    }));
    if (emailErro) return;
    await api.put(`/usuarios/edit/${id}`, fields);
    navigate("/users");
  }

  function inputClass(error) {
    return `border ${error ? "border-red-500" : "border-slate-300"} rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400`;
  }

  function errorMessage(error) {
    return error && (
      <span className="text-red-500 text-xs mt-1">Campo Obrigatório</span>
    );
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <form className="flex flex-col gap-6 p-6 bg-white rounded max-w-md">
      {step === 1 && (
        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <input
              type="text"
              name="nome"
              value={fields.nome}
              onChange={handleChange}
              onBlur={(e) => handleBlur("nome", e.target.value)}
              placeholder="Nome"
              className={inputClass(errors.nome)}
            />
            {errorMessage(errors.nome)}
          </div>
          <div className="flex flex-col w-32">
            <input
              type="number"
              name="idade"
              value={fields.idade}
              onChange={handleChange}
              onBlur={(e) => handleBlur("idade", e.target.value)}
              placeholder="Idade"
              className={inputClass(errors.idade)}
            />
            {errorMessage(errors.idade)}
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            onBlur={(e) => handleBlur("email", e.target.value)}
            placeholder="Email"
            className={inputClass(errors.email)}
          />
          {errorMessage(errors.email)}
        </div>
      )}
      <div className="flex justify-end">
        {step === 1 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
          >
            Próxima etapa
          </button>
        ) : (
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
          >
            Salvar
          </button>
        )}
      </div>
    </form>
  );
}

export default EditUser;