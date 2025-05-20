// src/renderer/components/forListaPaciente/PacienteFiltroBar.tsx

import React from 'react';
import {
   Box,
   Button,
   TextField,
   InputAdornment,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   SelectProps
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface PacienteFiltroBarProps {
   busca: string;
   setBusca: (valor: string) => void;
   ordenar: (campo: 'nome_completo' | 'idade') => void;
   filtroAtendimento: 'todos' | 'particular' | 'convenio' | 'servico_social';
   setFiltroAtendimento: (valor: 'todos' | 'particular' | 'convenio' | 'servico_social') => void;
}

export default function PacienteFiltroBar({
   busca,
   setBusca,
   ordenar,
   filtroAtendimento,
   setFiltroAtendimento
}: PacienteFiltroBarProps) {
   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
         <TextField
            size="small"
            placeholder="Buscar por nome"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            sx={{ width: '100%', backgroundColor: '#f7f7f7', borderRadius: 2 }}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <SearchIcon />
                  </InputAdornment>
               )
            }}
         />

         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button variant="outlined" onClick={() => ordenar('nome_completo')}>
               Ordenar por Nome
            </Button>
            <Button variant="outlined" onClick={() => ordenar('idade')}>
               Ordenar por Idade
            </Button>

            <FormControl size="small" sx={{ minWidth: 220 }}>
               <InputLabel id="filtro-atendimento-label">Tipo de Atendimento</InputLabel>
               <Select
                  labelId="filtro-atendimento-label"
                  value={filtroAtendimento}
                  label="Tipo de Atendimento"
                  onChange={(e: SelectChangeEvent) =>
                     setFiltroAtendimento(e.target.value as 'todos' | 'particular' | 'convenio' | 'servico_social')
                  }
               >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="particular">Particular</MenuItem>
                  <MenuItem value="convenio">Convênio</MenuItem>
                  <MenuItem value="servico_social">Serviço Social</MenuItem>
               </Select>
            </FormControl>
         </Box>
      </Box>
   );
}
