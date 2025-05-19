// src/renderer/components/PacienteDataGrid.tsx
import React, { useEffect, useState } from 'react';
import {
   Box,
   Button,
   Modal,
   Typography,
   Fade,
   useTheme,
   TextField,
   InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Paciente } from '../../../types/Paciente';
import { listarPacientes } from '../../services/pacienteService';
import PacienteActions from './PacienteActions';
import imagii from '../../../assets/images/papeljapones.png'
import imagiii from '../../../assets/images/couro.png'
import PacienteFiltroBar from './PacienteFiltroBar';
import { gerarColunas } from './ColunasPacientes';

interface PacienteDataGridProps {
   status: 'ativo' | 'pausado' | 'finalizado';
}

export default function PacienteDataGrid({ status }: PacienteDataGridProps) {
   const theme = useTheme();
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [busca, setBusca] = useState('');
   const [modalAberto, setModalAberto] = useState(false);
   const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);

   useEffect(() => {
      const carregar = async () => {
         const lista = await listarPacientes();
         const filtrados = lista.filter(
            (p) => p.status === status && (
               p.nome_completo.toLowerCase().includes(busca.toLowerCase()) ||
               p.telefone.includes(busca)
            )
         );
         setPacientes(filtrados);
      };
      carregar();
   }, [status, busca]);

   const abrirModal = (paciente: Paciente) => {
      setPacienteSelecionado(paciente);
      setModalAberto(true);
   };

   function calcularIdade(dataNascimento: string): number {
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      if (isNaN(nascimento.getTime())) return 0;
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const m = hoje.getMonth() - nascimento.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
         idade--;
      }
      return idade;
   }

   const colunas = gerarColunas(theme, calcularIdade, abrirModal);

   const ordenar = (campo: 'nome_completo' | 'idade') => {
      const ordenado = [...pacientes].sort((a, b) => {
         if (campo === 'idade') {
            return calcularIdade(a.data_nascimento) - calcularIdade(b.data_nascimento);
         }
         return a[campo].localeCompare(b[campo]);
      });
      setPacientes(ordenado);
   };
   return (
      <Box sx={{ width: '100%', backgroundColor: 'white', borderRadius: 4, boxShadow: 5 }}>
         <Box sx={{ maxWidth: 1400, mx: 'auto', backgroundColor: 'white', p: 3, borderRadius: 4, boxShadow: 5 }}>
            <TextField
               size="small"
               placeholder="Buscar por nome ou telefone"
               value={busca}
               onChange={(e) => setBusca(e.target.value)}
               sx={{ width: '100%', backgroundColor: '#f7f7f7', borderRadius: 2, mb: 2 }}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <SearchIcon />
                     </InputAdornment>
                  )
               }}
            />
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
               <Button variant="outlined" onClick={() => ordenar('nome_completo')}>Ordenar por Nome</Button>
               <Button variant="outlined" onClick={() => ordenar('idade')}>Ordenar por Idade</Button>
            </Box>
            <DataGrid
               rows={pacientes}
               columns={colunas}
               autoHeight
               disableRowSelectionOnClick
               getRowId={(row: Paciente) => row.id!}
               hideFooterPagination
               sx={{
                  backgroundColor: '#fff',
                  fontFamily: 'Now',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  boxShadow: 2,
                  fontSize: '1rem',
                  '& .MuiDataGrid-columnHeaders': {
                     fontWeight: 'bold',
                     fontSize: '1.2rem',
                     color: theme.palette.primary.dark,
                     textTransform: 'capitalize',
                     textShadow: 'unset',
                     letterSpacing: 0.5,
                     backgroundColor: '#f1f1f1',
                     borderBottom: '3px solid #ccc'
                  },
                  '& .MuiDataGrid-cell': {
                     alignItems: 'center',
                     fontSize: '1.1rem',
                     p: 1
                  },

                  '& .MuiDataGrid-columnSeparator': {
                     display: 'none'
                  }
               }}
            />
         </Box>

         <Modal open={modalAberto} onClose={() => setModalAberto(false)} closeAfterTransition>
            <Fade in={modalAberto}>
               <Box sx={{
                  backgroundImage: `url(${imagii})`,
                  padding: 4,
                  borderRadius: 3,
                  maxWidth: 500,
                  width: '100%',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  mx: 'auto',
                  my: '10vh',
                  boxShadow: 24,
                  outline: 'none'
               }}>
                  {pacienteSelecionado && (
                     <>
                        <Typography variant="h6" gutterBottom>
                           Ações para {pacienteSelecionado.nome_completo}
                        </Typography>
                        <PacienteActions
                           paciente={pacienteSelecionado}
                           onClose={() => setModalAberto(false)}
                        />
                     </>
                  )}
               </Box>
            </Fade>
         </Modal>
      </Box>
   );
}