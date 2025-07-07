import { Trash2 } from "lucide-react";

function Home() {
  const users = [
    {
      id: 1,
      nome: "João",
      idade: 25,
      email: "teste@teste.com",
    },
    {
      id: 2,
      nome: "Maria",
      idade: 30,
      email: "teste2@gmailcom",
    },
    {
      id: 3,
      nome: "Pedro",
      idade: 22,
      email: "ola@teste.com.br",
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-slate-500 flex justify-center items-start p-6 overflow-auto">
      <div className="flex flex-col gap-8 w-full max-w-2xl">
        {/* Formulário */}
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <form className="flex flex-col gap-6">
            <h1 className="text-3xl text-slate-700 font-bold text-center mb-4">
              Cadastro de Usuários
            </h1>
            <input
              name="nome"
              type="text"
              placeholder="Nome"
              className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              name="idade"
              type="number"
              placeholder="Idade"
              className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              type="button"
              className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
            >
              Cadastrar
            </button>
          </form>
        </div>
        {/* Lista de Usuários */}
        <div className="w-full bg-white rounded-lg shadow-lg p-8 flex flex-col items-center min-h-[350px]">
          <h1 className="text-3xl text-slate-700 font-bold text-center mb-4">
            Lista de Usuários
          </h1>
          {users.length === 0 ? (
            <div className="text-slate-400 text-center">
              Nenhum usuário cadastrado ainda.
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center w-full mb-4 p-4 border-b border-slate-300"
              >
                <div>
                  <p>
                    <strong>Nome:</strong> {user.nome}
                  </p>
                  <p>
                    <strong>Idade:</strong> {user.idade}
                  </p>
                  <p>
                    <strong>E-mail:</strong> {user.email}
                  </p>
                </div>
                <button className="bg-slate-700 text-white rounded p-2 hover:bg-slate-800 transition">
                  <Trash2 />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
