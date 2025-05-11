// src/renderer/pages/Consulta/novaConsulta.tsx
import React, { useState, useEffect, ContextType } from 'react';
import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { Consulta } from '../../../types/Consulta';
import { criarConsulta } from '../../services/consultaService';
import { listarPacientes } from '../../services/pacienteService';
import { Paciente } from '../../../types/Paciente';
import dayjs from 'dayjs';
import BotaoVoltar from '../../components/VoltarGlobal';
import background from '../../../assets/images/background3.png';
import FormularioAdd from '../../components/FormularioCard';
import { Colors } from '../../styles/Colors';
import PacienteAutocomplete from '../../components/PacienteAutocomplete';

export default function NovaConsulta() {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();

   const [pacienteId, setPacienteId] = useState<number | null>(null);
   const [pacienteNome, setPacienteNome] = useState<string>('');
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [dataHora, setDataHora] = useState<string>('');
   const [status, setStatus] = useState<string>('agendada');
   const [observacoes, setObservacoes] = useState<string>('');
   const [carregando, setCarregando] = useState<boolean>(false);

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
         status,
         observacoes,
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

   return (
      <div
         className="paciente-background"
         style={{ backgroundImage: `url(${background})`, padding: '40px' }}
      >
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
               fullWidth
               sx={{ mb: '8px' }}
            />

            <TextField
               label="Status"
               select
               value={status}
               onChange={(e) => setStatus(e.target.value)}
               fullWidth
               sx={{ mb: '8px' }}
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
               sx={{ mb: '8px' }}
            />

            <Button
               onClick={handleSalvar}
               fullWidth
               sx={{
                  backgroundColor: Colors.azulelegante,
                  color: Colors.brancocinza,
                  padding: '14px',
                  fontSize: '1.1rem',
                  borderRadius: '6px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                     backgroundColor: Colors.azulmarin,
                  },
               }}
            >
               Criar consulta
            </Button>
         </FormularioAdd>
      </div>
   );
}