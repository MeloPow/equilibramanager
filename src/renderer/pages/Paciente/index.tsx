// src/pages/Pacientes.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PacienteModule.css';
import { Avatar } from '@mui/material';
import gestaoPacientesLogo from '../../../assets/images/gestaopacienteslogo.png'
import background from '../../../assets/images/background3.png';

export default function Paciente() {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="paciente-background" style={{ backgroundImage: `url(${background})` }}>
            <div className="paciente-container" >
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Avatar
                        src={gestaoPacientesLogo}
                        alt="Logo"
                        sx={{ width: 300, height: 200 }}
                    />
                </div>
                <button className="menu-button" onClick={() => navigate('./adicionar')}>
                    ➕ Adicionar Paciente
                </button>

                <button className="menu-button" onClick={() => navigate('./listar?status=ativo')}>
                    📋 Lista de pacientes
                </button>

                <button className="menu-button" onClick={() => navigate('/Pacientes/aniversariantes')}>
                    🎉 Aniversariantes do mês
                </button>


            </div>
        </div>
    );
}
