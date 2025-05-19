// src/renderer/components/PacienteTabs.tsx
import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Colors } from '../../styles/Colors';

interface PacienteTabsProps {
   statusFiltro: 'ativo' | 'pausado' | 'finalizado';
   onChange: (novoStatus: 'ativo' | 'pausado' | 'finalizado') => void;
}

export default function PacienteTabs({ statusFiltro, onChange }: PacienteTabsProps) {
   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      onChange(newValue as 'ativo' | 'pausado' | 'finalizado');
   };

   return (
      <Box sx={{ width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: 3, mt: 2, mb: 2 }}>
         <Typography
            variant="h5"
            sx={{
               padding: 2,
               fontWeight: 600,
               textAlign: 'center',
               backgroundColor: Colors.roxobom,
               color: '#fff',
               borderTopLeftRadius: 8,
               borderTopRightRadius: 8,
               fontFamily: 'Montserrat, sans-serif',
               letterSpacing: 1.2,
            }}
         >
            Pacientes
         </Typography>
         <Tabs
            value={statusFiltro}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
            sx={{
               '& .MuiTabs-flexContainer': { justifyContent: 'center' },
               '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  fontFamily: 'Segoe UI, sans-serif',
               },
            }}
         >
            <Tab label="Ativos" value="ativo" />
            <Tab label="Pausados" value="pausado" />
            <Tab label="Finalizados" value="finalizado" />
         </Tabs>
      </Box>
   );
}
