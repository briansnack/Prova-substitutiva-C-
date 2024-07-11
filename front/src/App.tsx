import React from 'react';
  import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
  import './App.css';
  import AlunoCadastrar from './components/aluno-cadastrar';
  import AlunoListar from './components/aluno-listar';
import ImcCadastrar from './components/imc-cadastrar';
import ImcListar from './components/imc-listar';

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <div className="App">
              <nav>
                  <ul>
                      <li>
                        <Link to={"/"}>Home</Link>
                      </li>
                  </ul>
                  <ul>
                      <li>      
                        <Link to="./components/aluno-cadastrar">Cadastro de aluno</Link>
                      </li>
                  </ul>  
                  <ul>
                      <li>      
                        <Link to="./components/aluno-listar">Listar alunos</Link>
                      </li>
                  </ul>
                  <ul>
                      <li>      
                        <Link to="./components/imc-cadastrar">Cadastrar imc</Link>
                      </li>
                  </ul> 
                  <ul> 
                      <li>
                        <Link to="./components/imc-listar">Listar Imcs</Link>
                      </li>
                  </ul>
              </nav>
              <Routes>
                  <Route path="/components/aluno-cadastrar" element={<AlunoCadastrar />} />
                  <Route path="/components/aluno-listar" element={<AlunoListar />} />
                  <Route path="/components/imc-cadastrar" element={<ImcCadastrar />} />
                  <Route path="/components/imc-listar" element={<ImcListar />} />
              </Routes>
              <footer>
                <p>Desenvolvido por Brian Snack</p>
              </footer>
          </div>
      </BrowserRouter>
  );
};

export default App;