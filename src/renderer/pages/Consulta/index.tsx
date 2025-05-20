// src/pages/Consulta/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './consultaModule.css';
import background from '../../../assets/images/background3.png';
import GestaoConsultasLogo from '../../../assets/images/gestaoconsultaslogo.png';
import { Avatar } from '@mui/material';

export default function Consulta() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="consulta-background" style={{ backgroundImage: `url(${background})` }}>
            <div className="consulta-container">
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Avatar
                        src={GestaoConsultasLogo}
                        alt="Logo"
                        sx={{ width: 300, height: 200 }}
                    />
                </div>
                <button className="consulta-button" onClick={() => navigate('/Consulta/novaconsulta')}>
                    ➕ Nova consulta
                </button>

                <button className="consulta-button" onClick={() => navigate('/Consulta/hoje')}>
                    ✅ Consultas do dia
                </button>

                <button className="consulta-button" onClick={() => navigate('./listaconsultas?status=agendada')}>
                    📋 Listar consultas agendadas
                </button>


                <button className="consulta-button" onClick={() => navigate('./listaconsultas?status=realizada')}>
                    📋 Listar consultas realizadas
                </button>


                <button className="consulta-button" onClick={toggleExpand}>
                    📚 Listas de consultas não realizadas/canceladas ▾
                </button>

                {expanded && (
                    <div className="options-box">
                        <button className="option-button" onClick={() => navigate('./listaconsultas?status=não realizada')}>
                            📋 Listar consultas não realizadas
                        </button>
                        <button className="option-button" onClick={() => navigate('./listaconsultas?status=cancelada')}>
                            📋 Listar consultas canceladas
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}