import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aluno } from "../models/Aluno";

function AlunoCadastrar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    console.log("O componente foi carregado...");
}, []);

  function cadastrarAluno(e: any) {
    const aluno: Aluno = {
      nome: nome,
      cpf: cpf,
    };

    //FETCH ou AXIOS
    fetch('http://localhost:5062/cliente/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        setNome('');
        setCpf('');
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

  return (
    <div>
      <h1>Cadastrar Aluno</h1>
      <form onSubmit={cadastrarAluno}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <label>CPF:</label>
        <input
          type="text"
          placeholder="Digite o cpf"
          onChange={(e: any) => setCpf(e.target.value)}
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AlunoCadastrar;