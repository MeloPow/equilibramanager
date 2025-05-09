export interface Paciente {
  id?: number;
  nome_completo: string;
  data_nascimento: string;
  sexo: 'M' | 'F' | 'O';
  cpf: string;
  telefone: string;
  email?: string | null;
  endereco?: string | null;
  profissao?: string | null;
  estado_civil?: string | null;
  observacoes?: string | null;
  status: 'ativo' | 'pausado' | 'finalizado';
}
