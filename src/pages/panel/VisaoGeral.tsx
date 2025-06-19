import React from "react";
import { motion } from "framer-motion";
import PanelLayout from "./PanelLayout";

export default function VisaoGeral() {
  return (
    <PanelLayout>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-white via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_60px_#a259f7] animate-pulse select-none mb-8"
        style={{ textShadow: "0 0 32px #a259f7, 0 0 8px #fff" }}
      >
        Visão Geral
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full bg-white/10 backdrop-blur-xl border-2 border-fuchsia-400/30 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6"
      >
        <h2 className="text-2xl font-bold text-fuchsia-200 mb-2">Resumo do seu painel</h2>
        <p className="text-fuchsia-100 text-center text-lg mb-4">
          Veja rapidamente o status do seu servidor, ferramentas ativas, membros, vazamentos e muito mais em um só lugar.
        </p>
        <div className="flex flex-wrap gap-6 justify-center w-full">
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all border-2 border-fuchsia-400/30 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40">
            Ver Analytics
          </button>
          <button className="px-8 py-4 rounded-xl bg-white/10 text-fuchsia-200 font-bold text-lg shadow-lg hover:bg-fuchsia-700/80 hover:text-white hover:scale-105 transition-all border-2 border-fuchsia-400/30 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40">
            Gerenciar Ferramentas
          </button>
        </div>
      </motion.div>
    </PanelLayout>
  );
} 