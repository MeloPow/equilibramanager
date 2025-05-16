export interface Paciente {
  id?: number;
  nome_completo: string;
  data_nascimento: string;
  sexo: 'Masculino' | 'Feminino' | 'Outro';
  cpf: string;
  telefone?: string;
  tipo_atendimento: 'particular' | 'convenio' | 'servico_social';
  email?: string | null;
  endereco?: string | null;
  profissao?: string | null;
  estado_civil?: string | null;
  religiao?: string | null;
  escolaridade?: string | null;
  status: 'ativo' | 'pausado' | 'finalizado';
  observacoes?: string | null;
}
