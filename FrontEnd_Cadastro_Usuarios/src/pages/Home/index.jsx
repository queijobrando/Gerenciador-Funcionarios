import { useEffect, useState, useRef } from "react"; // sempre executar quando a pagina abrir
import { Trash2 } from "lucide-react";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]); // estado para armazenar os usuários

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  //async é uma função que depende de uma resposta de uma API, ou seja, é uma função assíncrona

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data); // atualiza o estado com os usuários recebidos da API
  }

  async function createUsers() {
    await api.post("/usuarios", {
      nome: inputName.current.value, // pega o valor do input de nome
      idade: inputAge.current.value, // pega o valor do input de idade
      email: inputEmail.current.value, // pega o valor do input de email
    });

    // Limpa os campos após cadastrar
    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";

    getUsers(); // chama a função para atualizar a lista de usuários
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`); // chama a API para deletar o usuário com o ID fornecido
    getUsers(); // atualiza a lista de usuários após a exclusão
  }

  useEffect(() => {
    getUsers();
  }, []);

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
              ref={inputName} // pega a referência do input
              placeholder="Nome"
              className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              name="idade"
              type="number"
              ref={inputAge}
              placeholder="Idade"
              className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              name="email"
              type="email"
              ref={inputEmail}
              placeholder="E-mail"
              className="border border-slate-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              type="button"
              className="bg-slate-700 text-white font-semibold rounded px-4 py-2 hover:bg-slate-800 transition"
              onClick={createUsers} // chama a função para criar o usuário
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
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-slate-700 text-white rounded p-2 hover:bg-slate-800 transition"
                >
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
