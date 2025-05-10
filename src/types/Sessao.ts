export interface Sessao {
  id?: number;
  paciente: number; // paciente_id
  data_hora: string;
  status: string;
  observacoes?: string;
  paciente_nome: string;
}
