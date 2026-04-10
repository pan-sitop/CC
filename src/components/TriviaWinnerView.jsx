import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function TriviaWinnerView({ winnerTeamIds, teams, onReturnToStart }) {
    
    useEffect(() => {
        const duration = 5 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#4142F5', '#C3FB34']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#4142F5', '#C3FB34']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    const winners = teams.filter(t => winnerTeamIds.includes(t.id));

    return (
        <motion.div 
            className="w-full h-screen bg-white flex flex-col items-center justify-center p-8 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="font-ryker font-black text-5xl md:text-7xl text-azul-gatuno uppercase tracking-widest text-center mb-12 drop-shadow-md">
                ¡SUPERVIVIENTES!
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-8 w-full max-w-6xl">
                {winners.map(winner => (
                    <motion.div 
                        key={winner.id}
                        className="bg-azul-gatuno border-8 border-verde-limon rounded-[3rem] p-10 flex flex-col items-center shadow-2xl relative w-full max-w-xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                    >
                        <img 
                            src={winner.avatar} 
                            alt="Campeón" 
                            className="w-48 h-48 sm:w-64 sm:h-64 object-contain -mt-24 mb-6 drop-shadow-[0_0_20px_rgba(195,251,52,0.8)]"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <h2 className="font-ryker text-white text-4xl sm:text-5xl uppercase text-center mb-6 break-words w-full px-4">
                            {winner.name}
                        </h2>
                        
                        <div className="bg-white/10 rounded-2xl p-6 w-full text-center border font-camingo border-verde-limon/30">
                            <h3 className="text-verde-limon text-xl font-bold uppercase mb-4 tracking-wider">Integrantes</h3>
                            <ul className="text-white text-lg space-y-2">
                                {winner.members.map((m, idx) => (
                                    <li key={idx} className="truncate">~ {m} ~</li>
                                ))}
                                {winner.members.length === 0 && <li className="italic opacity-80">El Michi Solitario</li>}
                            </ul>
                        </div>

                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-verde-limon flex flex-col items-center justify-center rounded-full border-4 border-azul-gatuno shadow-lg rotate-12">
                            <span className="font-ryker font-black text-azul-gatuno text-3xl leading-none">{winner.points}</span>
                            <span className="font-camingo font-bold text-azul-gatuno text-xs uppercase">Puntos</span>
                        </div>
                    </motion.div>
                ))}

                {winners.length === 0 && (
                    <div className="text-3xl font-camingo font-bold text-gray-500">
                        Nadie sobrevivió. ¡Todos perdieron!
                    </div>
                )}
            </div>

            <motion.button 
                onClick={onReturnToStart}
                className="mt-16 px-10 py-5 bg-white text-azul-gatuno border-4 border-azul-gatuno rounded-full font-ryker font-black text-2xl uppercase hover:bg-azul-gatuno hover:text-white transition-colors shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                Volver al Inicio
            </motion.button>
        </motion.div>
    );
}
