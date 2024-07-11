import React from 'react';
  import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
  import './App.css';
  import AlunoCadastrar from './components/aluno-cadastrar';

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
                        <Link to="./components/tarefa-listar-concluidas">Lista de tarefas concluidas</Link>
                      </li>
                  </ul>
                  <ul>
                      <li>      
                        <Link to="./components/tarefa-listar-nao-concluidas">Lista de tarefas não concluidas</Link>
                      </li>
                  </ul> 
                  <ul> 
                      <li>
                        <Link to="./components/tarefa-cadastrar">Cadastrar Tarefas</Link>
                      </li>
                  </ul>
              </nav>
              <Routes>
                  <Route path="/components/aluno-cadastrar" element={<AlunoCadastrar />} />
              </Routes>
              <footer>
                <p>Desenvolvido por Brian Snack</p>
              </footer>
          </div>
      </BrowserRouter>
  );
};

export default App;