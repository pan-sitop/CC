import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AVATARS = [
    'Layer_1.png', 
    'Layer_1-1.png', 
    'Layer_1-2.png', 
    'Layer_1-3.png', 
    'Layer_1-4.png'
];

export default function TeamRegistrationView({ onStart }) {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [membersInput, setMembersInput] = useState('');
    const [avatarIndex, setAvatarIndex] = useState(0);

    const handleAddTeam = (e) => {
        e.preventDefault();
        if (!teamName.trim()) return;

        const members = membersInput.split(',').map(m => m.trim()).filter(m => m);
        
        const newTeam = {
            id: Date.now().toString(), // basic unique id
            name: teamName.trim(),
            members: members,
            lives: 5,
            points: 0,
            avatar: `/imgs/${AVATARS[avatarIndex % AVATARS.length]}`,
            isEliminated: false
        };

        setTeams([...teams, newTeam]);
        setTeamName('');
        setMembersInput('');
        setAvatarIndex(avatarIndex + 1);
    };

    const handleRemoveTeam = (id) => {
        setTeams(teams.filter(t => t.id !== id));
    };

    return (
        <motion.div 
            className="w-full h-full flex flex-col items-center justify-start py-12 px-6 md:px-12 overflow-y-auto custom-scrollbar pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h1 className="font-ryker font-black text-4xl md:text-5xl text-azul-gatuno mb-8 uppercase tracking-widest text-center mt-8">
                Registro de Equipos
            </h1>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
                
                {/* Formulario */}
                <div className="w-full md:w-1/3 bg-white p-6 rounded-[2rem] shadow-xl border-4 border-verde-limon h-fit">
                    <h2 className="font-ryker text-2xl text-azul-gatuno mb-6 uppercase tracking-wider text-center">Nuevo Equipo</h2>
                    <form onSubmit={handleAddTeam} className="flex flex-col gap-4">
                        <div>
                            <label className="font-camingo font-bold text-azul-gatuno block mb-2">Nombre del Equipo</label>
                            <input 
                                type="text" 
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Ej: Los Michis CSS"
                                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-azul-gatuno focus:outline-none font-camingo text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="font-camingo font-bold text-azul-gatuno block mb-2">Integrantes (separados por coma)</label>
                            <textarea 
                                value={membersInput}
                                onChange={(e) => setMembersInput(e.target.value)}
                                placeholder="Ana, Juan, María, Pedro..."
                                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-azul-gatuno focus:outline-none font-camingo text-lg resize-none h-24"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="mt-4 w-full py-4 rounded-full font-geomanist font-bold text-lg uppercase tracking-widest bg-azul-gatuno text-white shadow-[0_0_15px_rgba(65,66,245,0.4)] hover:bg-verde-limon hover:text-gray-900 transition-all duration-300"
                        >
                            Añadir Equipo
                        </button>
                    </form>
                </div>

                {/* Lista de Equipos */}
                <div className="w-full md:w-2/3 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teams.map(team => (
                            <motion.div 
                                key={team.id}
                                className="bg-white p-4 rounded-2xl shadow-md border-2 border-transparent relative flex flex-col items-center"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <button 
                                    onClick={() => handleRemoveTeam(team.id)}
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold hover:bg-red-500 hover:text-white transition-colors"
                                    title="Eliminar equipo"
                                >
                                    ✕
                                </button>
                                <img src={team.avatar} alt="Avatar" className="w-20 h-20 object-contain drop-shadow-sm mb-3" />
                                <h3 className="font-ryker text-lg text-azul-gatuno font-black uppercase text-center mb-2 line-clamp-1 break-all">{team.name}</h3>
                                <div className="font-camingo text-sm text-gray-500 text-center w-full h-10 overflow-hidden line-clamp-2">
                                    {team.members.length > 0 ? team.members.join(', ') : 'Sin integrantes listados'}
                                </div>
                            </motion.div>
                        ))}
                        {teams.length === 0 && (
                            <div className="col-span-full h-48 flex items-center justify-center text-gray-400 font-camingo text-xl italic">
                                Aún no hay equipos registrados...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Iniciar Batalla */}
            {teams.length > 0 && (
                <motion.div 
                    className="fixed bottom-8 z-50"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                >
                    <button
                        onClick={() => onStart(teams)}
                        className="px-10 py-5 rounded-full font-ryker font-black text-2xl uppercase tracking-widest bg-verde-limon text-azul-gatuno shadow-[0_0_25px_rgba(195,251,52,0.6)] hover:scale-105 hover:bg-azul-gatuno hover:text-white hover:shadow-[0_0_25px_rgba(65,66,245,0.6)] transition-all duration-300 border-4 border-white"
                    >
                        ¡Comenzar Supervivencia!
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
