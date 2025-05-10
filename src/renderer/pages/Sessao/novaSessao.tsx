// src/renderer/pages/Sessao/novaSessao.tsx
import React, { useState, useEffect, ContextType } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { Sessao } from '../../../types/Sessao';
import { criarSessao } from '../../services/sessaoService';
import { listarPacientes } from '../../services/pacienteService';
import { Paciente } from '../../../types/Paciente';
import dayjs from 'dayjs';
import BotaoVoltar from '../../components/VoltarGlobal'
import background from '../../../assets/images/background3.png'
export default function NovaSessao() {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();

   const [pacienteId, setPacienteId] = useState<number | null>(null);
   const [pacienteNome, setPacienteNome] = useState<string>('');
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [buscaNome, setBuscaNome] = useState<string>('');
   const [dataHora, setDataHora] = useState<string>('');
   const [status, setStatus] = useState<string>('agendada');
   const [observacoes, setObservacoes] = useState<string>('');
   const [carregando, setCarregando] = useState<boolean>(false);

   //botão voltar
   type ContextType = { drawerOpen: boolean };
   const { drawerOpen } = useOutletContext<ContextType>();

   useEffect(() => {
      const paramData = searchParams.get('dataHora');
      const paramId = searchParams.get('pacienteId');
      const paramNome = searchParams.get('pacienteNome');

      if (paramData) {
         const localFormat = dayjs(paramData).format('YYYY-MM-DDTHH:mm');
         setDataHora(localFormat);
      }
      if (paramId) setPacienteId(Number(paramId));
      if (paramNome) setPacienteNome(paramNome);

      if (!paramId) {
         listarPacientes()
            .then(lista => setPacientes(lista.filter(p => p.status === 'ativo')))
            .catch(console.error);
      }
   }, [searchParams]);

   const handleSalvar = async () => {
      if (!dataHora || !pacienteId) return alert('Informe a data e o paciente.');
      setCarregando(true);
      const pacienteSelecionado = pacientes.find(p => p.id === pacienteId);

      const nova: Sessao = {
         paciente: pacienteId,
         data_hora: dataHora,
         status,
         observacoes,
         paciente_nome: pacienteNome || pacienteSelecionado?.nome_completo || '',
      };
      try {
         await criarSessao(nova);
         alert('Sessão criada com sucesso!');
         navigate(-1);
      } catch (error) {
         console.error(error);
         alert('Erro ao criar sessão.');
      } finally {
         setCarregando(false);
      }
   };

   const pacientesFiltrados = pacientes.filter(p =>
      p.nome_completo.toLowerCase().includes(buscaNome.toLowerCase())
   );

   return (
      <div
         className="paciente-background"
         style={{ backgroundImage: `url(${background})`, padding: '40px' }}
      >
         <BotaoVoltar drawerOpen={drawerOpen} />
         <Box sx={{ p: 3, maxWidth: 500, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">Nova Sessão</Typography>

            {!pacienteId && (
               <>
                  <TextField
                     label="Buscar por nome"
                     value={buscaNome}
                     onChange={(e) => setBuscaNome(e.target.value)}
                     fullWidth
                  />
                  <TextField
                     label="Paciente"
                     select
                     value={pacienteId || ''}
                     onChange={(e) => setPacienteId(Number(e.target.value))}
                     fullWidth
                  >
                     {pacientesFiltrados.map(p => (
                        <MenuItem key={p.id} value={p.id}>{p.nome_completo}</MenuItem>
                     ))}
                  </TextField>
               </>
            )}

            <TextField
               label="Data e Hora"
               type="datetime-local"
               value={dataHora}
               onChange={(e) => setDataHora(e.target.value)}
               InputLabelProps={{ shrink: true }}
               fullWidth
            />

            <TextField
               label="Status"
               select
               value={status}
               onChange={(e) => setStatus(e.target.value)}
               fullWidth
            >
               <MenuItem value="agendada">Agendada</MenuItem>
               <MenuItem value="realizada">Realizada</MenuItem>
               <MenuItem value="cancelada">Cancelada</MenuItem>
            </TextField>

            <TextField
               label="Observações"
               multiline
               rows={4}
               value={observacoes}
               onChange={(e) => setObservacoes(e.target.value)}
               fullWidth
            />

            <Button
               variant="contained"
               color="primary"
               onClick={handleSalvar}
               disabled={carregando}
            >
               Salvar Sessão
            </Button>
         </Box>
      </div>
   );
}
