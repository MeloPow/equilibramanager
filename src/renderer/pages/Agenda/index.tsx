// src/pages/Agenda.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AgendaModule.css';
import background from '../../../assets/images/background3.png';

export default function Agenda() {
    const navigate = useNavigate();

    return (
        <div className="agenda-background" style={{ backgroundImage: `url(${background})` }}>
            <div className="agenda-container">
                <button className="agenda-button" onClick={() => navigate('/Agenda/calendario')}>
                    📅 Ver calendário
                </button>

                <button className="agenda-button" onClick={() => navigate('/agenda/hoje')}>
                    ✅ Sessões do dia
                </button>

                <button className="agenda-button" onClick={() => navigate('/agenda/nova')}>
                    ➕ Nova sessão
                </button>
            </div>
        </div>
    );
}
