import { useEffect, useState } from "react";
import { Imc } from "../models/Imc";


function ImcListar() {
  const [imcs, setImcs] = useState<Imc[]>([]);

  useEffect(() => {
    carregarImc();
  }, []);

  function carregarImc() {
    //FETCH ou AXIOS
    fetch("http://localhost:5062/imc/listar")
      .then((resposta) => resposta.json())
      .then((imc: Imc[]) => {
        console.table(imc);
        setImcs(imc);
      });
  }

  return (
    <div>
      <h1>Listar imcs</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>peso</th>
            <th>altura</th>
          </tr>
        </thead>
        <tbody>
          {imcs.map((imc) => (
            <tr key={imc.imcId}>
              <td>{imc.imcId}</td>
              <td>{imc.nome}</td>
              <td>{imc.peso}</td>
              <td>{imc.altura}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImcListar;