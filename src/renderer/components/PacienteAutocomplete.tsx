// src/renderer/components/PacienteAutocomplete.tsx
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { Paciente } from '../../types/Paciente';
import { listarPacientes } from '../services/pacienteService';

interface PacienteAutocompleteProps {
   onSelecionar: (paciente: Paciente) => void;
   pacienteSelecionadoId?: number | null;
}

const PacienteAutocomplete: React.FC<PacienteAutocompleteProps> = ({ onSelecionar, pacienteSelecionadoId }) => {
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [inputValue, setInputValue] = useState('');
   const [carregando, setCarregando] = useState(true);

   useEffect(() => {
      listarPacientes()
         .then((lista) => {
            const ativos = lista.filter(p => p.status === 'ativo');
            setPacientes(ativos);
         })
         .catch(console.error)
         .finally(() => setCarregando(false));
   }, []);

   const pacienteSelecionado = pacientes.find(p => p.id === pacienteSelecionadoId) || null;

   // Sincronizar inputValue com o nome do paciente selecionado
   useEffect(() => {
      const paciente = pacientes.find(p => p.id === pacienteSelecionadoId);
      if (paciente) {
         setInputValue(paciente.nome_completo);
      } else {
         setInputValue('');
      }
   }, [pacienteSelecionadoId, pacientes]);

   return (
      <Autocomplete
         options={pacientes}
         getOptionLabel={(option) => option.nome_completo}
         value={pacienteSelecionado}
         onChange={(event, novoPaciente) => {
            if (novoPaciente) {
               onSelecionar(novoPaciente);
            } else {
               onSelecionar({ id: null, nome_completo: '' } as Paciente);
            }
         }}
         inputValue={inputValue}
         onInputChange={(event, novoValor) => setInputValue(novoValor)}
         loading={carregando}
         renderInput={(params) => (
            <TextField
               {...params}
               label="Buscar paciente"
               placeholder="Digite o nome do paciente"
               fullWidth
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                     <>
                        {carregando ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                     </>
                  )
               }}
            />
         )}
         isOptionEqualToValue={(option, value) => option.id === value.id}
      />
   );
};

export default PacienteAutocomplete;
