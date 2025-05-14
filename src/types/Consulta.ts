export type StatusConsulta =
  | 'agendada'
  | 'realizada'
  | 'não realizada'
  | 'cancelada';

export type TipoConsulta = 'normal' | 'conveniada' | 'servico_social';

export type FormaPagamento = 'dinheiro' | 'cartao' | 'pix' | 'outro';

export interface Consulta {
  id?: number;
  paciente: number;
  data_hora: string; // ISO string (YYYY-MM-DDTHH:mm:ss)
  status: StatusConsulta;
  observacoes?: string;
  paciente_nome: string;
  foi_paga: boolean;
  motivo_cancelamento?: string;
  valor?: number;
  tipo?: TipoConsulta;
  atestado_anexo?: string; // Caminho do arquivo salvo
  forma_pagamento?: FormaPagamento;
  data_pagamento?: string; // ISO (YYYY-MM-DD)
}
