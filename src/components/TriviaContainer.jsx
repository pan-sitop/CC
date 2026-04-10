import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TeamRegistrationView from './TeamRegistrationView';
import TriviaDashboardView from './TriviaDashboardView';
import TriviaWinnerView from './TriviaWinnerView';

export default function TriviaContainer({ onReturnToStart }) {
    const [step, setStep] = useState('registration'); 
    
    // Array of { id, name, members: string[], lives: 5, points: 0, avatar: string, isEliminated: false }
    const [teams, setTeams] = useState([]);
    const [winnerTeamIds, setWinnerTeamIds] = useState([]);

    const handleStartGame = (registeredTeams) => {
        setTeams(registeredTeams);
        setStep('playing');
    };

    const handleGameEnd = (updatedTeams, showTiebreaker) => {
        setTeams(updatedTeams);
        if (showTiebreaker) {
            setStep('tiebreaker');
        } else {
            // Determinar ganador basado en MÁS PUNTOS (ignorando si están vivos o muertos)
            const highestPoints = Math.max(...updatedTeams.map(t => t.points));
            const winners = updatedTeams.filter(t => t.points === highestPoints);
            setWinnerTeamIds(winners.map(w => w.id));
            setStep('winner');
        }
    };
    
    const handleTiebreakerWin = (updatedTeams, winnerId) => {
        setTeams(updatedTeams);
        setWinnerTeamIds([winnerId]);
        setStep('winner');
    };

    return (
        <div className="relative w-full h-full z-20">
             {/* Ocultamos el botón de regreso dentro de las vistas en sí cuando lo necesiten o lo pasamos */}
            <div className="absolute top-4 left-4 z-50">
                <button
                    onClick={onReturnToStart}
                    className="w-12 h-12 rounded-full bg-white text-azul-gatuno shadow-md flex items-center justify-center font-bold text-xl hover:bg-red-100 hover:text-red-600 transition-colors"
                    title="Abandonar Trivia X"
                >
                    ✕
                </button>
            </div>

            {step === 'registration' && (
                <TeamRegistrationView onStart={handleStartGame} />
            )}
            {step === 'playing' && (
                <TriviaDashboardView teams={teams} onGameEnd={handleGameEnd} />
            )}
            {step === 'tiebreaker' && (
                <TriviaDashboardView teams={teams} isTiebreaker={true} onGameEnd={handleTiebreakerWin} />
            )}
            {step === 'winner' && (
                <TriviaWinnerView winnerTeamIds={winnerTeamIds} teams={teams} onReturnToStart={onReturnToStart} />
            )}
        </div>
    );
}
