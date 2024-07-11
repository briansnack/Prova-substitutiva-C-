import { Aluno } from "./Aluno";

export interface Imc {
  imcId?: string;
  peso: string;
  altura: string;
  imcs: string;
  status?: string;
  criadoEm?: string;
  alunoId: string;
  nome: string;
}