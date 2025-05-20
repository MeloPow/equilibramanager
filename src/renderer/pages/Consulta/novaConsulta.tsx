// src/renderer/pages/Consulta/novaConsulta.tsx
import React, { useState, useEffect } from 'react';
import {
   Box, Button, TextField, MenuItem, Typography, FormControlLabel,
   Checkbox, InputAdornment
} from '@mui/material';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { Consulta, TipoConsulta, FormaPagamento } from '../../../types/Consulta';
import { criarConsulta } from '../../services/consultaService';
import { listarPacientes } from '../../services/pacienteService';
import { Paciente } from '../../../types/Paciente';
import BotaoVoltar from '../../components/VoltarGlobal';
import background from '../../../assets/images/background3.png';
import imagi from '../../../assets/images/papeljapones.png';
import FormularioAdd from '../../components/FormularioGlobal';
import { Colors } from '../../styles/Colors';
import PacienteAutocomplete from '../../components/PacienteAutocomplete';

export default function NovaConsulta() {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();

   const [pacienteId, setPacienteId] = useState<number | null>(null);
   const [pacienteNome, setPacienteNome] = useState<string>('');
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [dataHora, setDataHora] = useState<string>('');
   const [modalidade, setModalidade] = useState<'presencial' | 'remota'>('presencial');
   const [status, setStatus] = useState<'agendada' | 'realizada' | 'não realizada' | 'cancelada'>('agendada');
   const [tipo, setTipo] = useState<TipoConsulta>('normal');
   const [foiPaga, setFoiPaga] = useState<boolean>(false);
   const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('dinheiro');
   const [dataPagamento, setDataPagamento] = useState<string>('');
   const [valor, setValor] = useState<number | ''>('');
   const [atestadoAnexo, setAtestadoAnexo] = useState<File | null>(null);
   const [motivoCancelamento, setMotivoCancelamento] = useState<string>('');
   const [observacoes, setObservacoes] = useState<string>('');
   const [carregando, setCarregando] = useState<boolean>(false);

   type ContextType = { drawerOpen: boolean };
   const { drawerOpen } = useOutletContext<ContextType>();

   useEffect(() => {
      const paramData = searchParams.get('dataHora');
      const paramId = searchParams.get('pacienteId');
      const paramNome = searchParams.get('pacienteNome');

      if (paramData) setDataHora(paramData);
      if (paramId) setPacienteId(Number(paramId));
      if (paramNome) setPacienteNome(paramNome);

      if (!paramId) {
         listarPacientes()
            .then(lista => setPacientes(lista.filter(p => p.status === 'ativo')))
            .catch(console.error);
      }
   }, [searchParams]);

   useEffect(() => {
      listarPacientes().then(setPacientes);
   }, []);

   const handleSalvar = async () => {
      if (!dataHora || !pacienteId) return alert('Informe a data e o paciente.');
      setCarregando(true);
      const pacienteSelecionado = pacientes.find(p => p.id === pacienteId);

      const nova: Consulta = {
         paciente: pacienteId,
         data_hora: dataHora,
         modalidade,
         status,
         observacoes,
         tipo,
         foi_paga: foiPaga,
         forma_pagamento: foiPaga ? formaPagamento : undefined,
         data_pagamento: foiPaga ? dataPagamento : undefined,
         valor: foiPaga ? Number(valor) : undefined,
         motivo_cancelamento: (status === 'cancelada' || status === 'não realizada') ? motivoCancelamento : undefined,
         atestado_anexo: atestadoAnexo ? atestadoAnexo.name : undefined,
         paciente_nome: pacienteNome || pacienteSelecionado?.nome_completo || '',
      };

      try {
         await criarConsulta(nova);
         alert('Consulta criada com sucesso!');
         navigate(-1);
      } catch (error) {
         console.error(error);
         alert('Erro ao criar consulta.');
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
            <Typography variant="h5" fontWeight="bold">Nova Consulta</Typography>

            <Box sx={{ mb: 2 }}>
               <PacienteAutocomplete
                  pacienteSelecionadoId={pacienteId}
                  onSelecionar={(paciente) => {
                     setPacienteId(paciente.id || null);
                     setPacienteNome(paciente.nome_completo);
                  }}
               />
            </Box>

            <TextField
               label="Data e Hora"
               type="datetime-local"
               value={dataHora}
               onChange={(e) => setDataHora(e.target.value)}
               InputLabelProps={{ shrink: true }}
               fullWidth sx={{ mb: '8px' }}
            />
            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={modalidade === 'presencial'}
                        onChange={() => setModalidade('presencial')}
                     />
                  }
                  label="Presencial"
               />
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={modalidade === 'remota'}
                        onChange={() => setModalidade('remota')}
                     />
                  }
                  label="Remota"
               />
            </Box>
            <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value as any)} fullWidth sx={{ mb: '8px' }}>
               <MenuItem value="agendada">Agendada</MenuItem>
               <MenuItem value="realizada">Realizada</MenuItem>
               <MenuItem value="não realizada">Não realizada</MenuItem>
               <MenuItem value="cancelada">Cancelada</MenuItem>
            </TextField>

            <TextField select label="Tipo de Consulta" value={tipo} onChange={(e) => setTipo(e.target.value as any)} fullWidth sx={{ mb: '8px' }}>
               <MenuItem value="normal">Normal</MenuItem>
               <MenuItem value="conveniada">Conveniada</MenuItem>
               <MenuItem value="servico_social">Serviço Social</MenuItem>
            </TextField>

            {(status === 'cancelada' || status === 'não realizada') && (
               <TextField
                  label="Motivo do cancelamento ou não realização"
                  value={motivoCancelamento}
                  onChange={(e) => setMotivoCancelamento(e.target.value)}
                  fullWidth sx={{ mb: '8px' }}
               />
            )}

            {status === 'não realizada' && (
               <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Anexar atestado (PDF ou imagem):</Typography>
                  <input type="file" accept=".pdf,image/*" onChange={(e) => setAtestadoAnexo(e.target.files?.[0] || null)} />
               </Box>
            )}

            {deveMostrarPagamento && (
               <>
                  <FormControlLabel
                     control={<Checkbox checked={foiPaga} onChange={(e) => setFoiPaga(e.target.checked)} />}
                     label="Consulta foi paga?" sx={{ mb: '8px' }}
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
                           sx={{ mb: '8px' }}
                        />
                        <TextField
                           select label="Forma de pagamento"
                           value={formaPagamento}
                           onChange={(e) => setFormaPagamento(e.target.value as any)}
                           fullWidth sx={{ mb: '8px' }}
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
                           fullWidth sx={{ mb: '8px' }}
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
               fullWidth sx={{ mb: '8px' }}
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
               Criar consulta
            </Button>

         </FormularioAdd>
      </div>
   );
}
