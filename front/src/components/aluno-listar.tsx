import { useEffect, useState } from "react";
import { Aluno } from "../models/Aluno";


function AlunoListar() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  function carregarAlunos() {
    //FETCH ou AXIOS
    fetch("http://localhost:5062/aluno/listar")
      .then((resposta) => resposta.json())
      .then((aluno: Aluno[]) => {
        console.table(aluno);
        setAlunos(aluno);
      });
  }

  return (
    <div>
      <h1>Listar Alunos</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.alunoId}>
              <td>{aluno.alunoId}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.cpf}</td>
              <td>{aluno.criadoEm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlunoListar;