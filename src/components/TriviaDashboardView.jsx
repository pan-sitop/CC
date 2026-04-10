import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRIVIA_QUESTIONS, TIEBREAKER_QUESTION } from '../data/triviaQuestions';
import confetti from 'canvas-confetti';

export default function TriviaDashboardView({ teams: initialTeams, onGameEnd, isTiebreaker = false }) {
    const [teams, setTeams] = useState(initialTeams);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    
    // selectedWinners stores the IDs of teams selected as winners for the current round
    const [selectedWinners, setSelectedWinners] = useState([]);
    
    // Rob Round states
    const [isRobRound, setIsRobRound] = useState(false);
    const [showRobModal, setShowRobModal] = useState(false);

    useEffect(() => {
        // Evaluate if it's a rob round (e.g. every 5 questions: index 4, 9, 14...)
        if (!isTiebreaker && (currentQuestionIndex + 1) % 5 === 0 && currentQuestionIndex !== 0) {
            setIsRobRound(true);
            setShowRobModal(true);
        } else {
            setIsRobRound(false);
        }
    }, [currentQuestionIndex, isTiebreaker]);

    const activeTeams = teams.filter(t => !t.isEliminated);
    
    const questionData = isTiebreaker 
        ? TIEBREAKER_QUESTION 
        : TRIVIA_QUESTIONS[currentQuestionIndex];

    const toggleWinnerSelection = (teamId) => {
        if (selectedWinners.includes(teamId)) {
            setSelectedWinners(selectedWinners.filter(id => id !== teamId));
        } else {
            setSelectedWinners([...selectedWinners, teamId]);
        }
    };

    const applyResults = () => {
        let updatedTeams = [...teams];

        updatedTeams = updatedTeams.map(team => {
            if (team.isEliminated) return team;

            const isWinner = selectedWinners.includes(team.id);

            let newLives = team.lives;
            let newPoints = team.points;

            if (isRobRound) {
                if (isWinner) {
                    newLives += 1; // Rob round: winners get +1 life
                    newPoints += 20; // Extra points for harder round
                }
                // Losers don't lose lives in Rob round
            } else {
                if (isWinner) {
                    newPoints += 10; // Normal win
                } else {
                    newLives -= 1; // Normal loss
                }
            }

            return {
                ...team,
                lives: newLives,
                points: newPoints,
                isEliminated: newLives <= 0
            };
        });

        // Trigger some feedback
        if (selectedWinners.length > 0) {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#C3FB34', '#4142F5'] });
        }

        setTeams(updatedTeams);
        setSelectedWinners([]);
        setShowAnswer(false);
        setIsRobRound(false); // Reset for next

        const stillAlive = updatedTeams.filter(t => !t.isEliminated);

        if (isTiebreaker) {
            // TIEBREAKER ENDS INSTANTLY. Whoever won, is the ultimate winner.
            // If multiple selected, well, use the first or pass them all. 
            // The plan said "el que responda bien ahi ganara el juego"
            onGameEnd(updatedTeams, selectedWinners[0]); 
            return;
        }

        if (stillAlive.length <= 1) {
            // 1 or 0 alive means immediate endgame
            onGameEnd(updatedTeams, false);
            return;
        }

        if (currentQuestionIndex < TRIVIA_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Reached the end. Tiebreaker needed?
            // "Si hay varios vivos, gana el de más puntos. Si empatan en puntos, vamos a tiebreaker"
            const maxPoints = Math.max(...stillAlive.map(t => t.points));
            const topTeams = stillAlive.filter(t => t.points === maxPoints);

            if (topTeams.length > 1) {
                // TIE! Go to tiebreaker
                onGameEnd(updatedTeams, true);
            } else {
                // Clear winner
                onGameEnd(updatedTeams, false);
            }
        }
    };

    // Render logic
    const renderQuestionText = (text) => {
        // Split text by markdown blocks if present
        const parts = text.split('```');
        return parts.map((part, index) => {
            if (index % 2 !== 0) {
                // It's a code block
                const firstLineBreak = part.indexOf('\n');
                const lang = part.substring(0, firstLineBreak).trim();
                const code = part.substring(firstLineBreak + 1);
                return (
                    <div key={index} className="bg-gray-900 text-green-400 p-4 rounded-xl my-4 text-left font-mono text-sm md:text-base overflow-x-auto shadow-inner border border-gray-700">
                        {code.trim()}
                    </div>
                );
            }
            // Parse strongs or line breaks quickly
            return <div key={index} className="whitespace-pre-wrap">{part}</div>;
        });
    };

    return (
        <div className="w-full h-screen flex flex-col bg-slate-50 overflow-hidden relative">
            
            {/* Modal de Ronda de Robo */}
            <AnimatePresence>
                {showRobModal && (
                    <motion.div 
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-azul-gatuno border-8 border-verde-limon p-12 rounded-[3rem] text-center shadow-2xl max-w-2xl"
                            initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.6 }}
                        >
                            <h2 className="text-white font-ryker text-6xl uppercase tracking-widest mb-4">¡RONDA DE ROBO!</h2>
                            <p className="text-verde-limon font-camingo text-2xl mb-8 font-bold">
                                Los ganadores obtendrán +1 Vida extra.<br/>Los que fallen NO perderán vidas.
                            </p>
                            <img src="/imgs/cat-space.png" alt="Michi Robo" className="w-48 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(195,251,52,0.8)]" onError={(e)=>e.target.style.display='none'}/>
                            <button 
                                onClick={() => setShowRobModal(false)}
                                className="px-10 py-5 bg-white text-azul-gatuno rounded-full font-ryker font-black text-2xl uppercase hover:scale-105 transition-transform"
                            >
                                ¡Vamos!
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header info */}
            <div className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-8 shrink-0 z-10 border-b border-gray-200">
                <div className="font-ryker font-black text-2xl text-azul-gatuno">
                    {isTiebreaker ? '🔥 MUERTE SÚBITA 🔥' : `Ronda ${currentQuestionIndex + 1} / ${TRIVIA_QUESTIONS.length}`}
                </div>
                {isRobRound && (
                    <div className="bg-verde-limon text-azul-gatuno px-4 py-1 rounded-full font-bold uppercase tracking-widest animate-pulse border-2 border-azul-gatuno">
                        Ronda de Robo Activa
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                
                {/* Panel Central: Pregunta */}
                <div className="flex-[2] h-full flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto custom-scrollbar relative border-r-2 border-gray-200 bg-white/50">
                    <div className="max-w-4xl w-full bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col">
                        <h2 className="font-ryker text-azul-gatuno text-3xl md:text-4xl uppercase mb-8 leading-tight">
                            {renderQuestionText(questionData.question)}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {questionData.options.map((opt, idx) => (
                                <div 
                                    key={idx}
                                    className={`p-4 md:p-6 rounded-2xl border-4 font-camingo text-xl font-semibold flex items-center shadow-sm transition-all duration-300
                                        ${showAnswer 
                                            ? (idx === questionData.answer ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-gray-50 text-gray-400 opacity-50')
                                            : 'border-azul-gatuno/10 bg-white text-azul-gatuno'}`
                                    }
                                >
                                    <span className="w-10 h-10 rounded-full bg-azul-gatuno text-white flex items-center justify-center font-bold mr-4 shrink-0">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {renderQuestionText(opt)}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center border-t border-gray-200 pt-6">
                            {!showAnswer ? (
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    className="px-8 py-3 rounded-full bg-azul-gatuno text-white font-geomanist font-bold uppercase tracking-widest hover:bg-verde-limon hover:text-azul-gatuno transition-colors"
                                >
                                    Revelar Respuesta Correcta
                                </button>
                            ) : (
                                <div className="text-green-600 font-ryker text-2xl uppercase tracking-wider animate-bounce">
                                    ¡Respuesta Revelada!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Panel Lateral: Equipos */}
                <div className="flex-1 h-full bg-white flex flex-col items-center pt-8 overflow-y-auto custom-scrollbar pb-32">
                    <h3 className="font-ryker font-black text-2xl text-azul-gatuno uppercase mb-6 tracking-wide">Equipos Vivos</h3>
                    
                    <div className="w-full px-6 flex flex-col gap-4">
                        {activeTeams.map(team => {
                            const isSelected = selectedWinners.includes(team.id);
                            return (
                                <motion.div 
                                    key={team.id}
                                    className={`w-full p-4 rounded-2xl border-4 cursor-pointer transition-all duration-200 flex items-center shadow-sm
                                        ${isSelected ? 'border-verde-limon bg-verde-limon/5' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                    onClick={() => showAnswer && toggleWinnerSelection(team.id)}
                                    whileTap={showAnswer ? { scale: 0.98 } : {}}
                                >
                                    <img src={team.avatar} alt="avatar" className="w-16 h-16 object-contain mr-4" />
                                    <div className="flex-1">
                                        <div className="font-ryker font-black text-azul-gatuno truncate">{team.name}</div>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="text-red-500 font-bold tracking-widest">
                                                {'❤️'.repeat(team.lives)}
                                            </div>
                                            <div className="font-geomanist font-bold text-gray-400 text-sm">
                                                {team.points} pts
                                            </div>
                                        </div>
                                    </div>
                                    {showAnswer && (
                                        <div className="ml-4 flex flex-col items-center justify-center shrink-0">
                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors
                                                ${isSelected ? 'bg-verde-limon border-verde-limon text-azul-gatuno' : 'border-gray-300 text-transparent'}`}>
                                                ✔
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                        {activeTeams.length === 0 && (
                            <div className="text-gray-400 font-camingo text-center italic mt-4">Todos han sido eliminados...</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Panel Inferior Flotante de Controles */}
            {showAnswer && (
                <motion.div 
                    className="absolute bottom-0 w-full h-24 bg-azul-gatuno shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between px-8 md:px-16 border-t-4 border-verde-limon"
                    initial={{ y: 100 }} animate={{ y: 0 }}
                >
                    <div className="text-white font-camingo text-lg md:text-xl">
                        Has seleccionado <strong className="text-verde-limon">{selectedWinners.length}</strong> equipos como ganadores.
                    </div>
                    <button 
                        onClick={applyResults}
                        className="px-8 md:px-12 py-3 md:py-4 bg-verde-limon text-azul-gatuno rounded-full font-ryker font-black text-xl md:text-2xl uppercase hover:scale-105 transition-transform shadow-[0_0_15px_rgba(195,251,52,0.3)]"
                    >
                        {isTiebreaker ? '¡Declarar Campeón!' : 'Aplicar Resultados y Avanzar'}
                    </button>
                </motion.div>
            )}

        </div>
    );
}
