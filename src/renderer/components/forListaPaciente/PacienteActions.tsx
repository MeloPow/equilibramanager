// src/renderer/components/PacienteActions.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Fade, Modal, Typography, useTheme, } from '@mui/material';
import { Paciente } from '../../../types/Paciente';
import PacienteModal from './PacienteModalDetalhes';
import imagii from '../../../assets/images/papeljapones.png'

interface PacienteActionsProps {
   paciente: Paciente;
   onClose?: () => void;
}

export default function PacienteActions({ paciente, onClose }: PacienteActionsProps) {
   const navigate = useNavigate();
   const [modalAberto, setModalAberto] = useState(false);
   const theme = useTheme();
   const navegar = (path: string) => {
      navigate(path);
      if (onClose) onClose();
   };

   const excluir = async () => {
      const confirmado = confirm(`Deseja excluir o paciente ${paciente.nome_completo}?`);
      if (confirmado) {
         await window.api.deletarPaciente(paciente.id);
         if (onClose) onClose();
         location.reload();
      }
   };

   return (
      <Modal open={true} onClose={onClose} closeAfterTransition>
         <Fade in={true}>
            <Box
               sx={{
                  backgroundImage: `url(${imagii})`,
                  padding: 4,
                  borderRadius: 3,
                  maxWidth: '800px',
                  width: '100%',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  mx: 'auto',
                  my: '10vh',
                  boxShadow: 24,
                  outline: 'none'
               }}
            >
               <Typography
                  variant="h6"
                  fontWeight={500}
                  fontFamily="Montserrat"
                  textAlign="center"
                  sx={{ mb: 0.5, color: theme.palette.grey[800] }}
               >
                  Ações para
               </Typography>
               <Typography
                  variant="h5"
                  fontWeight={800}
                  fontFamily="Montserrat"
                  textAlign="center"
                  sx={{ mb: 2, color: '#115e40', wordBreak: 'break-word' }}
               >
                  {paciente.nome_completo}
               </Typography>
               <Divider />

               <Button
                  onClick={() => setModalAberto(true)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={botaoEstilizado}
               >
                  🔍 Exibir Detalhes
               </Button>
               <Button
                  onClick={() => navegar(`/Paciente/editarpaciente?id=${paciente.id}`)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={botaoEstilizado}
               >
                  ✏️ Editar Paciente
               </Button>
               <Button
                  onClick={() => navegar(`/Paciente/consultas?id=${paciente.id}`)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={botaoEstilizado}
               >
                  📆 Consultas
               </Button>
               <Button
                  onClick={() => navegar(`/Anamnese?id=${paciente.id}`)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={botaoEstilizado}
               >
                  📄 Anamnese
               </Button>
               <Button
                  onClick={() => navegar(`/Financeiro?id=${paciente.id}`)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={botaoEstilizado}
               >
                  💳 Financeiro
               </Button>
               <Button
                  onClick={() => navegar(`/Relatorios?id=${paciente.id}`)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={botaoEstilizado}
               >
                  📊 Relatórios
               </Button>

               <Divider sx={{ my: 1 }} />

               <Button
                  onClick={excluir}
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{
                     ...botaoEstilizado,
                     backgroundColor: theme.palette.error.main,
                     '&:hover': {
                        backgroundColor: theme.palette.error.dark,
                     }
                  }}
               >
                  ❌ Apagar Paciente
               </Button>


               <PacienteModal
                  open={modalAberto}
                  onClose={() => setModalAberto(false)}
                  paciente={paciente}
               />
            </Box>
         </Fade>
      </Modal>
   );
}

const botaoEstilizado = {
   fontWeight: 600,
   fontSize: '1.05rem',
   py: 1.7,
   borderRadius: 2,
   fontFamily: 'Montserrat',
   textTransform: 'none',
   mb: '4px',
   boxShadow: 2
};