// src/renderer/pages/Consulta/editarConsulta.tsx
import React, { useEffect, useState } from 'react';
import {
   Box, Button, TextField, MenuItem, Typography, FormControlLabel,
   Checkbox, InputAdornment
} from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Consulta, TipoConsulta, FormaPagamento } from '../../../types/Consulta';
import { atualizarConsulta, listarTodasConsultas } from '../../services/consultaService';
import { listarPacientes } from '../../services/pacienteService';
import { Paciente } from '../../../types/Paciente';
import BotaoVoltar from '../../components/VoltarGlobal';
import background from '../../../assets/images/background3.png';
import papel from '../../../assets/images/papeljapones.png';
import FormularioAdd from '../../components/FormularioCard';
import { Colors } from '../../styles/Colors';
import PacienteAutocomplete from '../../components/PacienteAutocomplete';

export default function EditarConsulta() {
   const navigate = useNavigate();
   const { id } = useParams();

   const [pacienteId, setPacienteId] = useState<number | null>(null);
   const [pacienteNome, setPacienteNome] = useState<string>('');
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [dataHora, setDataHora] = useState<string>('');
   const [status, setStatus] = useState<'agendada' | 'realizada' | 'não realizada' | 'cancelada'>('agendada');
   const [tipo, setTipo] = useState<TipoConsulta>('normal');
   const [foiPaga, setFoiPaga] = useState<boolean>(false);
   const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('dinheiro');
   const [dataPagamento, setDataPagamento] = useState<string>('');
   const [valor, setValor] = useState<number | ''>('');
   const [atestadoAnexo, setAtestadoAnexo] = useState<string>('');
   const [motivoCancelamento, setMotivoCancelamento] = useState<string>('');
   const [observacoes, setObservacoes] = useState<string>('');
   const [carregando, setCarregando] = useState<boolean>(false);

   type ContextType = { drawerOpen: boolean };
   const { drawerOpen } = useOutletContext<ContextType>();

   useEffect(() => {
      listarPacientes().then(setPacientes);
      listarTodasConsultas().then((todas) => {
         const consulta = todas.find(c => c.id === Number(id));
         if (!consulta) return alert('Consulta não encontrada.');
         setPacienteId(consulta.paciente);
         setPacienteNome(consulta.paciente_nome);
         setDataHora(consulta.data_hora);
         setStatus(consulta.status);
         setTipo(consulta.tipo || 'normal');
         setFoiPaga(consulta.foi_paga);
         setFormaPagamento(consulta.forma_pagamento || 'dinheiro');
         setDataPagamento(consulta.data_pagamento || '');
         setValor(consulta.valor ?? '');
         setMotivoCancelamento(consulta.motivo_cancelamento || '');
         setAtestadoAnexo(consulta.atestado_anexo || '');
         setObservacoes(consulta.observacoes || '');
      });
   }, [id]);

   const handleSalvar = async () => {
      if (!dataHora || !pacienteId) return alert('Informe a data e o paciente.');
      setCarregando(true);

      const atualizada: Consulta = {
         id: Number(id),
         paciente: pacienteId,
         data_hora: dataHora,
         status,
         observacoes,
         tipo,
         foi_paga: foiPaga,
         forma_pagamento: foiPaga ? formaPagamento : undefined,
         data_pagamento: foiPaga ? dataPagamento : undefined,
         valor: foiPaga ? Number(valor) : undefined,
         motivo_cancelamento: (status === 'cancelada' || status === 'não realizada') ? motivoCancelamento : undefined,
         atestado_anexo: atestadoAnexo || undefined,
         paciente_nome: pacienteNome,
      };

      try {
         await atualizarConsulta(atualizada);
         alert('Consulta atualizada com sucesso!');
         navigate(-1);
      } catch (error) {
         console.error(error);
         alert('Erro ao atualizar consulta.');
      } finally {
         setCarregando(false);
      }
   };

   const deveMostrarPagamento =
      (status === 'realizada' && (tipo === 'normal' || tipo === 'conveniada')) ||
      (status === 'não realizada' && !atestadoAnexo);

   return (
      <div className="paciente-background" style={{ backgroundImage: `url(${background})`, padding: '40px' }}>
         <BotaoVoltar drawerOpen={drawerOpen} />
         <FormularioAdd>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: '14px' }}>Editar Consulta</Typography>

            <TextField
               label="Data e Hora"
               type="datetime-local"
               value={dataHora}
               onChange={(e) => setDataHora(e.target.value)}
               InputLabelProps={{ shrink: true }}
               fullWidth sx={{ mb: 2 }}
            />

            <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value as any)} fullWidth sx={{ mb: 2 }}>
               <MenuItem value="agendada">Agendada</MenuItem>
               <MenuItem value="realizada">Realizada</MenuItem>
               <MenuItem value="não realizada">Não realizada</MenuItem>
               <MenuItem value="cancelada">Cancelada</MenuItem>
            </TextField>

            <TextField select label="Tipo de Consulta" value={tipo} onChange={(e) => setTipo(e.target.value as any)} fullWidth sx={{ mb: 2 }}>
               <MenuItem value="normal">Normal</MenuItem>
               <MenuItem value="conveniada">Conveniada</MenuItem>
               <MenuItem value="servico_social">Serviço Social</MenuItem>
            </TextField>

            {(status === 'cancelada' || status === 'não realizada') && (
               <TextField
                  label="Motivo do cancelamento ou não realização"
                  value={motivoCancelamento}
                  onChange={(e) => setMotivoCancelamento(e.target.value)}
                  fullWidth sx={{ mb: 2 }}
               />
            )}

            {status === 'não realizada' && (
               <TextField
                  label="Anexo do atestado (nome do arquivo)"
                  value={atestadoAnexo}
                  onChange={(e) => setAtestadoAnexo(e.target.value)}
                  fullWidth sx={{ mb: 2 }}
               />
            )}

            {deveMostrarPagamento && (
               <>
                  <FormControlLabel
                     control={<Checkbox checked={foiPaga} onChange={(e) => setFoiPaga(e.target.checked)} />}
                     label="Consulta foi paga?"
                     sx={{ mb: 2 }}
                  />
                  {foiPaga && (
                     <>
                        <TextField
                           label="Valor"
                           type="number"
                           value={valor}
                           onChange={(e) => setValor(Number(e.target.value))}
                           fullWidth
                           InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                           sx={{ mb: 2 }}
                        />
                        <TextField
                           select label="Forma de pagamento"
                           value={formaPagamento}
                           onChange={(e) => setFormaPagamento(e.target.value as any)}
                           fullWidth sx={{ mb: 2 }}
                        >
                           <MenuItem value="dinheiro">Dinheiro</MenuItem>
                           <MenuItem value="cartao">Cartão</MenuItem>
                           <MenuItem value="pix">Pix</MenuItem>
                           <MenuItem value="outro">Outro</MenuItem>
                        </TextField>
                        <TextField
                           label="Data do pagamento"
                           type="date"
                           value={dataPagamento}
                           onChange={(e) => setDataPagamento(e.target.value)}
                           InputLabelProps={{ shrink: true }}
                           fullWidth sx={{ mb: 2 }}
                        />
                     </>
                  )}
               </>
            )}

            <TextField
               label="Observações"
               multiline rows={4}
               value={observacoes}
               onChange={(e) => setObservacoes(e.target.value)}
               fullWidth sx={{ mb: 2 }}
            />

            <Button
               onClick={handleSalvar}
               disabled={carregando}
               fullWidth
               sx={{
                  backgroundColor: Colors.azulelegante,
                  color: Colors.brancocinza,
                  padding: '14px',
                  fontSize: '1.1rem',
                  borderRadius: '6px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: Colors.azulmarin },
               }}
            >
               Salvar alterações
            </Button>

         </FormularioAdd>
      </div>
   );
}
