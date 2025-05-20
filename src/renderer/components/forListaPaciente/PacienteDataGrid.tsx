// src/renderer/components/PacienteDataGrid.tsx
import React, { useEffect, useState } from 'react';
import {
   Box,
   useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Paciente } from '../../../types/Paciente';
import { listarPacientes } from '../../services/pacienteService';
import PacienteActions from './PacienteActions';
import PacienteFiltroBar from './PacienteFiltroBar';
import { gerarColunas } from './PacienteColunas';

interface PacienteDataGridProps {
   status: 'ativo' | 'pausado' | 'finalizado';
}

export default function PacienteDataGrid({ status }: PacienteDataGridProps) {
   const theme = useTheme();
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [busca, setBusca] = useState('');
   const [modalAberto, setModalAberto] = useState(false);
   const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
   const [filtroAtendimento, setFiltroAtendimento] = useState<'todos' | 'particular' | 'convenio' | 'servico_social'>('todos');

   useEffect(() => {
      const carregar = async () => {
         const lista = await listarPacientes();
         const filtrados = lista.filter(
            (p) =>
               p.status === status &&
               (filtroAtendimento === 'todos' || p.tipo_atendimento === filtroAtendimento) &&
               p.nome_completo.toLowerCase().includes(busca.toLowerCase())
         );
         setPacientes(filtrados);
      };
      carregar();
   }, [status, busca, filtroAtendimento]);

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
            <PacienteFiltroBar
               busca={busca}
               setBusca={setBusca}
               ordenar={ordenar}
               filtroAtendimento={filtroAtendimento}
               setFiltroAtendimento={setFiltroAtendimento}
            />
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

         {pacienteSelecionado && (
            <PacienteActions
               paciente={pacienteSelecionado}
               onClose={() => setPacienteSelecionado(null)}
            />
         )}
      </Box>
   );
}