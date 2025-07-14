import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin } from "lucide-react";
import api from "../services/api";

function Form({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    async function fetchPositions() {
      try {
        const response = await api.get("/employer/positions");
        setPositions(response.data);
      } catch (err) {
        console.error("Erro ao carregar os cargos:", err);
      }
    }

    fetchPositions();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues,
  } = useForm({
    shouldUnregister: false,
  });

  const stripNonDigits = (value) => value.replace(/\D/g, "");

  const handleNext = async () => {
    const isValid = await trigger([
      "name",
      "birthdate",
      "hiredate",
      "cpf",
      "email",
      "contact",
      "positionId",
    ]);
    if (isValid) setStep(2);
  };

  const handleBack = () => setStep(1);

  const submitFinal = () => {
    const data = getValues();
    data.birthdate = new Date(data.birthdate).toISOString().split("T")[0];
    data.hiredate = new Date(data.hiredate).toISOString().split("T")[0];
    data.cpf = stripNonDigits(data.cpf);
    data.contact = stripNonDigits(data.contact);
    data.cep = stripNonDigits(data.cep);
    onSubmit(data);
  };

  return (
    <div>
      {/* Barra de etapas */}
      <div className="flex justify-between mb-6">
        <div
          className={`flex items-center gap-2 ${
            step >= 1
              ? "px-4 py-2 rounded-3xl text-white font-medium bg-slate-700 transition"
              : "text-gray-400"
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span>Dados</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            step >= 2
              ? "px-4 py-2 rounded-3xl text-white font-medium bg-slate-700 transition"
              : "text-gray-400"
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>Endereço</span>
        </div>
      </div>

      <form className="min-h-[350px]">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo</label>
                <input
                  {...register("name", {
                    required: "Nome Completo é obrigatório",
                  })}
                  placeholder="Nome Completo"
                  className="input-style"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                <input
                  type="date"
                  {...register("birthdate", {
                    required: "Data de Nascimento é obrigatória",
                  })}
                  className="input-style"
                />
                {errors.birthdate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.birthdate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Data de Admissão</label>
                <input
                  type="date"
                  {...register("hiredate", {
                    required: "Data de Admissão é obrigatória",
                  })}
                  className="input-style"
                />
                {errors.hiredate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hiredate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CPF</label>
                <input
                  {...register("cpf", { required: "CPF é obrigatório" })}
                  className="input-style"
                  type="text"
                  placeholder="Insira o CPF"
                />
                {errors.cpf && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cpf.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  {...register("email", { required: "E-mail é obrigatório" })}
                  type="email"
                  placeholder="E-mail"
                  className="input-style"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Telefone
                </label>
                <input
                  {...register("contact", {
                    required: "Telefone de contato é obrigatório",
                  })}
                  className="input-style"
                  type="text"
                  placeholder="Insira o número"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cargo</label>
                <select
                  {...register("positionId", {
                    required: "Cargo é obrigatório",
                  })}
                  className="input-style"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione o Cargo
                  </option>
                  {positions.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.name}
                    </option>
                  ))}
                </select>
                {errors.positionId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.positionId.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Logradouro</label>
                <input
                  {...register("logradouro", {
                    required: "Logradouro é obrigatório",
                  })}
                  placeholder="Logradouro"
                  className="input-style"
                />
                {errors.logradouro && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.logradouro.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Complemento</label>
                <input
                  {...register("complemento")}
                  placeholder="Complemento"
                  className="input-style"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Número</label>
                <input
                  {...register("numero", { required: "Número é obrigatório" })}
                  placeholder="Número"
                  className="input-style"
                />
                {errors.numero && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.numero.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bairro</label>
                <input
                  {...register("bairro", { required: "Bairro é obrigatório" })}
                  placeholder="Bairro"
                  className="input-style"
                />
                {errors.bairro && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bairro.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cidade</label>
                <input
                  {...register("cidade", { required: "Cidade é obrigatória" })}
                  placeholder="Cidade"
                  className="input-style"
                />
                {errors.cidade && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cidade.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <input
                  {...register("estado", { required: "Estado é obrigatório" })}
                  placeholder="Estado"
                  className="input-style"
                />
                {errors.estado && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.estado.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CEP</label>
                <input
                  {...register("cep", { required: "CEP é obrigatório" })}
                  className="input-style"
                  type="text"
                  placeholder="Insira o CEP"
                />
                {errors.cep && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cep.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botões */}
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              Voltar
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded bg-slate-700 text-white hover:bg-slate-800 transition"
            >
              Próximo
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit(submitFinal)}
              className="px-4 py-2 rounded bg-slate-700 text-white hover:bg-slate-800 transition"
            >
              {isSubmitting ? "Enviando..." : "Finalizar"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
