import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function ParticlesBG() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-700 to-blue-500 opacity-30 blur-2xl"
          style={{
            width: `${60 + Math.random() * 120}px`,
            height: `${60 + Math.random() * 120}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 80 - 40, 0],
            x: [0, Math.random() * 80 - 40, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 12 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: Math.random() * 6,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0025] via-[#3a0ca3] to-[#7209b7] opacity-95" />
    </div>
  );
}

export default function Dashboard() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <ParticlesBG />
      <div className="w-full flex flex-col items-center justify-center z-10 px-4 pt-24 pb-12">
        {/* Logo com glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 flex justify-center"
        >
          <Image src="/logo.svg" alt="9M Logo" width={80} height={80} priority className="drop-shadow-[0_0_60px_#a259f7]" />
        </motion.div>
        {/* Título com efeito neon */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-white via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_60px_#a259f7] animate-pulse select-none"
          style={{ textShadow: "0 0 32px #a259f7, 0 0 8px #fff" }}
        >
          Dashboard 9M
        </motion.h1>
        {/* Card glassmorphism com animação */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 w-full max-w-2xl bg-white/10 backdrop-blur-xl border-2 border-fuchsia-400/30 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6"
        >
          <h2 className="text-2xl font-bold text-fuchsia-200 mb-2">Bem-vindo à sua dashboard!</h2>
          <p className="text-fuchsia-100 text-center text-lg mb-4">
            Aqui você acompanha analytics, gerencia ferramentas, vê vazamentos e controla tudo do seu servidor com o visual mais avançado do Brasil.
          </p>
          <div className="flex flex-wrap gap-6 justify-center w-full">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all border-2 border-fuchsia-400/30 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40">
              Ver Analytics
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/10 text-fuchsia-200 font-bold text-lg shadow-lg hover:bg-fuchsia-700/80 hover:text-white hover:scale-105 transition-all border-2 border-fuchsia-400/30 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40">
              Gerenciar Ferramentas
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/10 text-fuchsia-200 font-bold text-lg shadow-lg hover:bg-fuchsia-700/80 hover:text-white hover:scale-105 transition-all border-2 border-fuchsia-400/30 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40">
              Vazamentos
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 