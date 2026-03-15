import React from 'react';
import { motion } from 'framer-motion';

const SYMBOLS = ['{', '}', '[', ']', '/', '>', '<', '*', '&', '#', ';'];
const COLORS = ['text-azul-gatuno', 'text-verde-limon'];
const NUM_SYMBOLS = 30;

export default function FloatingBackground() {
    const elements = Array.from({ length: NUM_SYMBOLS }).map((_, i) => ({
        id: i,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        x: Math.random() * 100, // random start X %
        y: Math.random() * 100, // random start Y %
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 10 + 15, // 15-25s floating
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className={`absolute ${el.color} font-camingo text-4xl select-none`}
                    initial={{ left: `${el.x}%`, top: `${el.y}%`, scale: el.scale, opacity: 0 }}
                    animate={{
                        y: [0, -50, 50, 0],
                        x: [0, 30, -30, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {el.symbol}
                </motion.div>
            ))}
        </div>
    );
}
