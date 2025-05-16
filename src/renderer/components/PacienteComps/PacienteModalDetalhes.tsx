// src/renderer/components/paciente/PacienteModalDetalhes.tsx
import React from 'react';
import {
   Modal, Box, Typography, Button, Divider, useTheme, Avatar, Fade
} from '@mui/material';
import { Paciente } from '../../../types/Paciente';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
   open: boolean;
   onClose: () => void;
   paciente: Paciente;
}

export default function PacienteModalDetalhes({ open, onClose, paciente }: Props) {
   const theme = useTheme();

   return (
      <Modal open={open} onClose={onClose} closeAfterTransition>
         <Fade in={open}>
            <Box
               sx={{
                  backgroundColor: theme.palette.background.paper,
                  padding: 4,
                  borderRadius: 3,
                  maxWidth: 700,
                  width: '95%',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  mx: 'auto',
                  my: '7vh',
                  boxShadow: 12,
                  border: `2px solid ${theme.palette.primary.main}`,
                  position: 'relative',
               }}
            >
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56 }}>
                     <PersonIcon fontSize="large" />
                  </Avatar>
                  <Box>
                     <Typography variant="h5" fontWeight={600}>{paciente.nome_completo}</Typography>
                     <Typography variant="subtitle2" color="text.secondary">
                        {paciente.tipo_atendimento.toUpperCase()} | {paciente.status.toUpperCase()}
                     </Typography>
                  </Box>
               </Box>

               <Divider sx={{ mb: 2 }} />

               <Box sx={{ display: 'grid', gap: 2 }}>
                  <Typography><strong>📅 Nascimento:</strong> {paciente.data_nascimento || '-'}</Typography>
                  <Typography><strong>🧬 Sexo:</strong> {paciente.sexo}</Typography>
                  <Typography><strong>📞 Telefone:</strong> {paciente.telefone || '-'}</Typography>
                  <Typography><strong>📧 Email:</strong> {paciente.email || '-'}</Typography>
                  <Typography><strong>🏠 Endereço:</strong> {paciente.endereco || '-'}</Typography>
                  <Typography><strong>💼 Profissão:</strong> {paciente.profissao || '-'}</Typography>
                  <Typography><strong>❤️ Estado civil:</strong> {paciente.estado_civil || '-'}</Typography>
                  <Typography><strong>🛐 Religião:</strong> {paciente.religiao || '-'}</Typography>
                  <Typography><strong>🎓 Escolaridade:</strong> {paciente.escolaridade || '-'}</Typography>
                  <Typography><strong>🩺 Atendimento:</strong> {paciente.tipo_atendimento}</Typography>
                  <Typography><strong>📌 Status:</strong> {paciente.status}</Typography>
               </Box>

               <Divider sx={{ my: 3 }} />

               <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  <strong>📝 Observações:</strong><br />
                  {paciente.observacoes || 'Nenhuma observação registrada.'}
               </Typography>

               <Box sx={{ textAlign: 'right', mt: 4 }}>
                  <Button variant="contained" color="primary" onClick={onClose}>
                     Fechar
                  </Button>
               </Box>
            </Box>
         </Fade>
      </Modal>
   );
}
