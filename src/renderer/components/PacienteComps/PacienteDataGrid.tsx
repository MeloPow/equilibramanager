// src/renderer/components/PacienteDataGrid.tsx
import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Typography, Fade, Avatar, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Paciente } from '../../../types/Paciente';
import { listarPacientes } from '../../services/pacienteService';
import PacienteActions from './PacienteActions';
import BuildIcon from '@mui/icons-material/Build';
import imagii from '../../../assets/images/background2.png'
interface PacienteDataGridProps {
   status: 'ativo' | 'pausado' | 'finalizado';
}

export default function PacienteDataGrid({ status }: PacienteDataGridProps) {
   const theme = useTheme();
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [modalAberto, setModalAberto] = useState(false);
   const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);

   useEffect(() => {
      const carregar = async () => {
         const lista = await listarPacientes();
         const filtrados = lista.filter(p => p.status === status);
         setPacientes(filtrados);
      };
      carregar();
   }, [status]);

   const abrirModal = (paciente: Paciente) => {
      setPacienteSelecionado(paciente);
      setModalAberto(true);
   };

   const colunas: GridColDef[] = [
      {
         field: 'nome_completo',
         headerName: 'Nome Completo',
         flex: 1.5,
         renderCell: (params) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  {params.row.nome_completo.charAt(0)}
               </Avatar>
               <Typography fontWeight={500} fontSize="1.2rem" fontFamily={'Montserrat'}>{params.row.nome_completo}</Typography>
            </Box>
         )
      },
      { field: 'data_nascimento', headerName: 'Nascimento', flex: 1 },
      { field: 'sexo', headerName: 'Sexo', flex: 0.6 },
      { field: 'telefone', headerName: 'Telefone', flex: 1 },
      { field: 'tipo_atendimento', headerName: 'Atendimento', flex: 1 },
      {
         field: 'acoes',
         headerName: '',
         sortable: false,
         filterable: false,
         disableColumnMenu: true,
         flex: 0.5,
         renderCell: (params: GridRenderCellParams) => (
            <Button
               variant="outlined"
               startIcon={<BuildIcon />}
               onClick={() => abrirModal(params.row)}
               sx={{ fontWeight: 600, borderRadius: 3, color: theme.palette.primary.dark, borderColor: theme.palette.primary.light, width: '200px' }}
            >
               Ações
            </Button>
         ),
      },
   ];

   return (
      <Box sx={{ width: '100%', backgroundImage: `url(${imagii})` }}>
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
               boxShadow: 3,
               fontSize: '1rem',
               '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: theme.palette.grey[100],
                  fontWeight: 'bold',
                  fontSize: '1.4rem',
                  color: theme.palette.primary.dark,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  maxWidth: '1400px'
               },
               '& .MuiDataGrid-cell': {
                  alignItems: 'center',
                  fontSize: '1.2rem',
               }
            }}
         />

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
