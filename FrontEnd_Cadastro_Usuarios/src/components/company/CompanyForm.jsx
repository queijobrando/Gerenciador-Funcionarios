import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin } from "lucide-react";

function CompanyForm({ onSubmit }) {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues,
  } = useForm({
    shouldUnregister: false,
  });

  const handleNext = async () => {
    const isValid = await trigger(["name", "cnpj", "email", "contact"]);
    if (isValid) setStep(2);
  };

  const handleBack = () => setStep(1);

  const submitFinal = () => {
    const data = getValues();
    onSubmit(data);
  };

  return (
    <div>
      {/* Barra de etapas */}
      <div className="flex justify-between mb-6">
        <div className={`flex items-center gap-2 ${step >= 1 ? "px-4 py-2 rounded-3xl text-white font-medium bg-slate-700 transition" : "text-gray-400"}`}>
          <Building2 className="w-5 h-5" />
          <span>Dados</span>
        </div>
        <div className={`flex items-center gap-2 ${step >= 2 ? "px-4 py-2 rounded-3xl text-white font-medium bg-slate-700 transition" : "text-gray-400"}`}>
          <MapPin className="w-5 h-5" />
          <span>Endereço</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitFinal)} className="min-h-[350px]">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <input {...register("name", { required: "Nome da empresa é obrigatório" })} placeholder="Nome da Empresa" className="input-style" />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}

              <input {...register("fantasyName")} placeholder="Nome Fantasia" className="input-style" />

              <input {...register("cnpj", { required: "CNPJ é obrigatório" })} placeholder="CNPJ" className="input-style" />
              {errors.cnpj && <p className="text-red-500">{errors.cnpj.message}</p>}

              <input {...register("email", { required: "E-mail é obrigatório" })} type="email" placeholder="E-mail" className="input-style" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}

              <input {...register("contact", { required: "Telefone de contato é obrigatório" })} placeholder="Telefone" className="input-style" />
              {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <input {...register("logradouro", { required: "Logradouro é obrigatório" })} placeholder="Logradouro" className="input-style" />
              {errors.logradouro && <p className="text-red-500">{errors.logradouro.message}</p>}

              <input {...register("complemento")} placeholder="Complemento" className="input-style" />

              <input {...register("numero", { required: "Número é obrigatório" })} placeholder="Número" className="input-style" />
              {errors.numero && <p className="text-red-500">{errors.numero.message}</p>}

              <input {...register("bairro", { required: "Bairro é obrigatório" })} placeholder="Bairro" className="input-style" />
              {errors.bairro && <p className="text-red-500">{errors.bairro.message}</p>}

              <input {...register("cidade", { required: "Cidade é obrigatória" })} placeholder="Cidade" className="input-style" />
              {errors.cidade && <p className="text-red-500">{errors.cidade.message}</p>}

              <input {...register("estado", { required: "Estado é obrigatório" })} placeholder="Estado" className="input-style" />
              {errors.estado && <p className="text-red-500">{errors.estado.message}</p>}

              <input {...register("cep", { required: "CEP é obrigatório" })} placeholder="CEP" className="input-style" />
              {errors.cep && <p className="text-red-500">{errors.cep.message}</p>}
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
              type="submit"
              disabled={isSubmitting}
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

export default CompanyForm;
