import { useForm } from "react-hook-form";

function CompanyForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: "Nome da empresa é obrigatório" })}
          type="text"
          id="name"
          placeholder="Nome da Empresa"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input
          {...register("fantasyName")}
          type="text"
          id="name"
          placeholder="Nome Fantasia"
        />
        <input
          {...register("cnpj", { required: "CNPJ é obrigatório" })}
          type="text"
          id="cnpj"
          placeholder="CNPJ"
        />
        {errors.cnpj && <p className="text-red-500">{errors.cnpj.message}</p>}
        <input
          {...register("email", { required: "E-mail é obrigatório" })}
          type="email"
          id="email"
          placeholder="E-mail"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          {...register("contact", {
            required: "Telefone para contato é obrigatório",
          })}
          type="number"
          id="contact"
          placeholder="Telefone de contato"
        />
        {errors.contact && (
          <p className="text-red-500">{errors.contact.message}</p>
        )}
        <input
          {...register("logradouro", { required: "Logradouro é obrigatório" })}
          type="text"
          id="logradouro"
          placeholder="Logradouro"
        />
        {errors.logradouro && (
          <p className="text-red-500">{errors.logradouro.message}</p>
        )}
        <input
          {...register("complemento")}
          type="text"
          id="complemento"
          placeholder="Complemento"
        />
        {errors.complemento && (
          <p className="text-red-500">{errors.complemento.message}</p>
        )}
        <input
          {...register("numero", { required: "Número é obrigatório" })}
          type="number"
          id="numero"
          placeholder="Número"
        />
        {errors.numero && (
          <p className="text-red-500">{errors.numero.message}</p>
        )}
        <input
          {...register("bairro", { required: "Bairro é obrigatório" })}
          type="text"
          id="bairro"
          placeholder="Bairro"
        />
        {errors.bairro && (
          <p className="text-red-500">{errors.bairro.message}</p>
        )}
        <input
          {...register("cidade", { required: "Cidade é obrigatória" })}
          type="text"
          id="cidade"
          placeholder="Cidade"
        />
        {errors.cidade && (
          <p className="text-red-500">{errors.cidade.message}</p>
        )}
        <input
          {...register("estado", { required: "Estado é obrigatório" })}
          type="text"
          id="estado"
          placeholder="Estado"
        />
        {errors.estado && (
          <p className="text-red-500">{errors.estado.message}</p>
        )}
        <input
          {...register("cep", { required: "CEP é obrigatório" })}
          type="number"
          id="cep"
          placeholder="CEP"
        />
        {errors.cep && <p className="text-red-500">{errors.cep.message}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-2 rounded transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Enviando..." : "Criar"}
        </button>
      </form>
    </div>
  );
}

export default CompanyForm;
