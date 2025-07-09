import { useState } from "react";

function AddUser({ createUsers }) {
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

  function handleRegister(e) {
    e.preventDefault();
    const emailErro = !fields.email.trim();
    setErrors((prev) => ({
      ...prev,
      email: emailErro,
    }));
    if (emailErro) return;
    createUsers(fields);
    setFields({ nome: "", idade: "", email: "" });
    setStep(1);
    setErrors({ nome: false, idade: false, email: false });
  }

  function inputClass(error) {
    return `border ${error ? "border-red-500" : "border-slate-300"} rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400`;
  }

  function errorMessage(error) {
    return error && (
      <span className="text-red-500 text-xs mt-1">Campo Obrigatório</span>
    );
  }

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
            onClick={handleRegister}
            className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
          >
            Cadastrar
          </button>
        )}
      </div>
    </form>
  );
}

export default AddUser;