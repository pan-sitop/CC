import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const PRESENTATION_STEPS = [
    {
        title: "Lo Esencial",
        code: `<!-- El Esqueleto -->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Michi Web</title>\n  </head>\n  <body>\n    <header>Bienvenido</header>\n    <main>\n      <button>Entrar</button>\n    </main>\n  </body>\n</html>`,
        preview: (
            <div className="flex flex-col items-center text-center">
                <img src="/imgs/cat-ht5.png" alt="Gato construyendo" className="w-56 h-56 md:w-64 md:h-64 object-contain mb-4 drop-shadow-md" onError={(e) => { e.target.src = 'https://placehold.co/200x200/fff/4142F5?text=Cat+HT5'; }} />
                <h3 className="text-2xl md:text-3xl font-ryker font-black text-azul-gatuno mb-3">Lo Esencial</h3>
                <p className="text-lg md:text-xl text-violeta-deep font-camingo text-pretty leading-relaxed">Maquetación con HTML, CSS y la interactividad de JS. Es la base de todo lo que vemos.</p>
            </div>
        )
    },
    {
        title: "La Conexión",
        code: `// El Cerebro\nfunction manejarLogin(usuario) {\n  const esValido = verificarDB(usuario);\n  if (esValido) {\n    concederAcceso();\n    cargarDatosDelGato();\n  } else {\n    mostrarError();\n  }\n}`,
        preview: (
            <div className="flex flex-col items-center text-center relative">
                <img
                    src="/imgs/cat-server.png"
                    alt="Gato servidores"
                    className="w-56 h-56 md:w-64 md:h-64 object-contain mb-4 drop-shadow-md relative z-20 easter-egg-trigger"
                    onError={(e) => { e.target.src = 'https://placehold.co/200x200/fff/4142F5?text=Cat+Server'; }}
                />
                <h3 className="text-2xl md:text-3xl font-ryker font-black text-azul-gatuno mb-3">La Conexión</h3>
                <p className="text-lg md:text-xl text-violeta-deep font-camingo text-pretty leading-relaxed">¿Cómo recordamos datos? Conectamos una Base de Datos para que el sistema tenga memoria y sea robusto.</p>
            </div>
        )
    },
    {
        title: "Al Mundo",
        code: `# El Salto a Producción\nversion: '3'\nservices:\n  web:\n    image: michi-app:latest\n    deploy:\n      replicas: 100\n      resources:\n        limits:\n          cpus: "2.0"\n          memory: "4G"`,
        preview: (
            <div className="flex flex-col items-center text-center">
                <img src="/imgs/cat-space.png" alt="Gato astronauta" className="w-56 h-56 md:w-64 md:h-64 object-contain mb-4 drop-shadow-md" onError={(e) => { e.target.src = 'https://placehold.co/200x200/fff/4142F5?text=Cat+Space'; }} />
                <h3 className="text-2xl md:text-3xl font-ryker font-black text-azul-gatuno mb-3">Al Mundo</h3>
                <p className="text-lg md:text-xl text-violeta-deep font-camingo text-pretty leading-relaxed">¡Despegue! Lanzamos el proyecto a internet para que cualquier persona pueda usar nuestra web.</p>
            </div>
        )
    }
];

export default function PresentationView({ onFinish }) {
    const [step, setStep] = useState(0);
    const tapCountRef = useRef(0);
    const tapTimerRef = useRef(null);

    const handleNext = () => {
        if (step < PRESENTATION_STEPS.length - 1) {
            setStep(step + 1);
        } else {
            onFinish();
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleSecretTap = (e) => {
        // Prevent default only if we are actually clicking the image 
        // We'll attach this to the image dynamically in rendering
        if (e.cancelable) e.preventDefault();

        tapCountRef.current += 1;

        if (tapCountRef.current === 1) {
            tapTimerRef.current = setTimeout(() => {
                tapCountRef.current = 0;
            }, 1000);
        }

        if (tapCountRef.current >= 3) {
            clearTimeout(tapTimerRef.current);
            tapCountRef.current = 0;
            console.log("Easter egg servidor activado!");
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#4142F5', '#C3FB34']
            });
            alert("¡Miau! Servidor de michis hackeado 🐾");
        }
    };

    const current = PRESENTATION_STEPS[step];

    return (
        <motion.div
            className="w-full flex-grow min-h-[90vh] flex items-center justify-center p-4 md:p-8 pointer-events-auto -mt-4 md:mt-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
        >
            <div className="w-full max-w-6xl h-[80vh] md:h-[85vh] md:max-h-[900px] flex flex-col md:flex-row gap-0 shadow-2xl rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md border border-gray-200">

                {/* Michi-Editor (Left) */}
                <div className="flex-1 lg:flex-[1.2] bg-gray-900 text-green-400 p-6 md:p-8 flex flex-col overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-inner border-b-4 md:border-b-0 md:border-r-4 border-azul-gatuno relative">
                    <div className="flex items-center gap-3 mb-4 md:mb-6 bg-gray-800/50 p-2 md:p-3 rounded-xl w-fit">
                        <div className="flex items-center gap-2 group cursor-pointer" onClick={handlePrev}>
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${step > 0 ? 'bg-red-500 group-hover:bg-red-400 group-hover:scale-110 group-active:scale-95 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-red-900 cursor-not-allowed opacity-50'} transition-all flex items-center justify-center`} title="Anterior"></div>
                            <span className={`font-ryker text-xs md:text-sm tracking-wider uppercase ${step > 0 ? 'text-red-400' : 'text-gray-600'} transition-colors ml-1`}>
                                Atrás
                            </span>
                        </div>

                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-yellow-500 opacity-50 mx-2"></div>

                        <div className="flex items-center gap-2 group cursor-pointer" onClick={handleNext}>
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 group-hover:bg-green-400 group-hover:scale-110 group-active:scale-95 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all flex items-center justify-center" title={step < PRESENTATION_STEPS.length - 1 ? 'Siguiente' : '¡A Jugar!'}></div>
                            <span className="font-ryker text-xs md:text-sm tracking-wider uppercase text-green-400 transition-colors mr-1">
                                {step < PRESENTATION_STEPS.length - 1 ? 'Sig.' : 'Jugar'}
                            </span>
                        </div>

                        <span className="ml-4 font-camingo text-gray-400 text-sm md:text-base hidden sm:inline-block border-l border-gray-700 pl-4">~ /Code Cats / {current.title.toLowerCase().replace(/ /g, '-')}</span>
                    </div>

                    <h2 className="text-2xl font-ryker text-white mb-4 uppercase tracking-wider">{current.title}</h2>

                    <div className="flex-1 font-camingo text-base md:text-xl whitespace-pre-wrap break-words overflow-y-auto custom-scrollbar leading-relaxed pb-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {current.code}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Live Preview (Right) */}
                <div className="flex-1 bg-white p-6 md:p-8 flex flex-col overflow-hidden rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none relative">
                    <div className="text-sm font-ryker text-violeta-deep/50 mb-2 md:mb-6 uppercase tracking-wider border-b pb-2 flex-shrink-0">Live Preview</div>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col text-left font-camingo pb-4 md:pb-6 custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -50, scale: 1.05 }}
                                transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                                className="w-full flex justify-center"
                                // Delegate the secret tap only for step 1 (La Conexión) to the wrapper
                                onClick={step === 1 ? handleSecretTap : undefined}
                                onTouchEnd={step === 1 ? handleSecretTap : undefined}
                            >
                                {current.preview}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
