import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
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

export default function SignIn() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <ParticlesBG />
      <div className="w-full flex flex-col items-center justify-center z-10 px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 flex justify-center"
        >
          <Image src="/logo.svg" alt="9M Logo" width={80} height={80} priority className="drop-shadow-[0_0_60px_#a259f7]" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-white via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_60px_#a259f7] animate-pulse select-none mb-8"
          style={{ textShadow: "0 0 32px #a259f7, 0 0 8px #fff" }}
        >
          Entrar na 9M
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border-2 border-fuchsia-400/30 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6"
        >
          {error && (
            <div className="w-full bg-red-500/80 text-white text-center rounded-lg py-2 font-bold mb-2 animate-pulse">
              Erro ao fazer login. Tente novamente ou use outra conta.
            </div>
          )}
          <button
            onClick={() => signIn("discord")}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#5865F2] to-fuchsia-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all border-2 border-fuchsia-400/30 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40"
          >
            <Image src="/discord.svg" alt="Discord" width={28} height={28} />
            Entrar com Discord
          </button>
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-fuchsia-700 font-bold text-lg shadow-lg hover:bg-fuchsia-100 hover:scale-105 transition-all border-2 border-fuchsia-400/30 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40"
          >
            <Image src="/google.svg" alt="Google" width={28} height={28} />
            Entrar com Google
          </button>
        </motion.div>
      </div>
    </main>
  );
} 