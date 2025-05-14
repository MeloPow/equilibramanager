// src/pages/Consulta/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './consultaModule.css';
import background from '../../../assets/images/background3.png';

export default function Consulta() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="consulta-background" style={{ backgroundImage: `url(${background})` }}>
            <div className="consulta-container">

                <button className="consulta-button" onClick={toggleExpand}>
                    📚 Gerenciar Consultas ▾
                </button>

                {expanded && (
                    <div className="options-box">
                        <button className="option-button" onClick={() => navigate('./listaconsultas?status=agendada')}>
                            📋 Listar consultas agendadas
                        </button>
                        <button className="option-button" onClick={() => navigate('./listaconsultas?status=realizada')}>
                            📋 Listar consultas realizadas
                        </button>
                        <button className="option-button" onClick={() => navigate('./listaconsultas?status=não realizada')}>
                            📋 Listar consultas não realizadas
                        </button>
                        <button className="option-button" onClick={() => navigate('./listaconsultas?status=cancelada')}>
                            📋 Listar consultas canceladas
                        </button>
                    </div>
                )}

                <button className="consulta-button" onClick={() => navigate('/Consulta/hoje')}>
                    ✅ Consultas do dia
                </button>

                <button className="consulta-button" onClick={() => navigate('/Consulta/nova')}>
                    ➕ Nova consulta
                </button>
            </div>
        </div>
    );
}