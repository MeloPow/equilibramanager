// src/pages/Agenda.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './consultaModule.css';
import background from '../../../assets/images/background3.png';

export default function Consulta() {
    const navigate = useNavigate();

    return (
        <div className="consulta-background" style={{ backgroundImage: `url(${background})` }}>
            <div className="consulta-container">

                <button className="consulta-button" onClick={() => navigate('/consulta/listaconsultas')}>
                    📚 Gerenciar Consultas
                </button>

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
