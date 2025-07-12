import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register({ onSubmit }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    shouldUnregister: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            {...register("name", { required: "Nome Completo é obrigatório" })}
            placeholder="Nome Completo"
            className="input-style"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email", { required: "E-mail é obrigatório" })}
            type="email"
            placeholder="E-mail"
            className="input-style"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("username", { required: "Username é obrigatório" })}
            placeholder="Username"
            className="input-style"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("password", { required: "Senha é obrigatória" })}
            type="password"
            placeholder="Senha"
            className="input-style"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 rounded bg-slate-700 text-white hover:bg-slate-800 transition disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Finalizar"}
        </button>

        <span
          onClick={() => navigate("/login")}
          className="text-slate-600 text-sm cursor-pointer hover:underline"
        >
          Já tem conta? Faça login
        </span>
      </div>
    </form>
  );
}

export default Register;
