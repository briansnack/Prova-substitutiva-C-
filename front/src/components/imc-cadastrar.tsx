import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Imc } from "../models/Imc";
import { Aluno } from "../models/Aluno";

function ImcCadastrar() {
  const navigate = useNavigate();
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [imcs, setImcs] = useState<Imc[]>([]);
  const [nome, setNome] = useState("")
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoId, setAlunoId] = useState("");
  
  useEffect(() => {
    carregarImcs();
  }, []);

  function carregarImcs() {
    //FETCH ou AXIOS
    fetch("http://localhost:5062/imc/listar")
      .then((resposta) => resposta.json())
      .then((imcs: Imc[]) => {
        setImcs(imcs);
      });
  }

  function cadastrarImc(e: any) {
    const imc: Imc = {
        peso: peso,
        altura: altura,
        imcs: "",
        criadoEm: "",
        nome: "",
        alunoId: ""
    };

    //FETCH ou AXIOS
    fetch("http://localhost:5062/imc/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imc),
    })
      .then((resposta) => resposta.json())
      .then((imc: Imc) => {
        navigate("/pages/imc/listar");
      });
    e.preventDefault();
  }

  return (
    <div>
      <h1>Cadastrar Aluno</h1>
      <form onSubmit={cadastrarImc}>
      <label>Nomes:</label>
        <select onChange={(e: any) => setAlunoId(e.target.value)}>
          {alunos.map((aluno) => (
            <option
              value={aluno.alunoId}
              key={aluno.alunoId}
            >
              {aluno.nome}
            </option>
          ))}
        </select>
        <br />
        <label>Peso:</label>
        <input
          type="text"
          placeholder="Digite o peso"
          onChange={(e: any) => setPeso(e.target.value)}
          required
        />
        <br />
        <label>Altura:</label>
        <input
          type="text"
          placeholder="Digite a altura"
          onChange={(e: any) => setAltura(e.target.value)}
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ImcCadastrar;