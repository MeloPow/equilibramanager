

// src/pages/Paciente/listar.tsx
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import PacienteTabs from '../../components/forListaPaciente/PacienteTabs';
import PacienteDataGrid from '../../components/forListaPaciente/PacienteDataGrid';
import background from '../../../assets/images/background3.png';
import BotaoVoltar from '../../components/VoltarGlobal';

export default function ListarPacientes() {
    const [searchParams, setSearchParams] = useSearchParams();
    const statusFiltro = (searchParams.get('status') as 'ativo' | 'pausado' | 'finalizado') || 'ativo';
    const [status, setStatus] = useState<'ativo' | 'pausado' | 'finalizado'>(statusFiltro);
    const [reloadKey, setReloadKey] = useState(0);

    type ContextType = { drawerOpen: boolean };
    const { drawerOpen } = useOutletContext<ContextType>();

    const handleChange = (novoStatus: 'ativo' | 'pausado' | 'finalizado') => {
        setStatus(novoStatus);
        setSearchParams({ status: novoStatus });
    };

    const reloadParam = searchParams.get('reload');
    useEffect(() => {
        setReloadKey(prev => prev + 1);
    }, [reloadParam]);

    return (
        <div className="paciente-background" style={{ backgroundImage: `url(${background})` }}>
            <BotaoVoltar drawerOpen={drawerOpen} />
            <Box sx={{ px: 2, py: 4, minWidth: '1400px' }}>{/**  height: '400px', maxHeight: '400px', width: '1400px', maxWidth: '1400px' }}>*/}
                <PacienteTabs statusFiltro={status} onChange={handleChange} />
                <PacienteDataGrid key={reloadKey} status={status} />
            </Box>
        </div>
    );
}
