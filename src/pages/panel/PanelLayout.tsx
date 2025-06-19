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

export default function PanelLayout({ children }: { children: React.ReactNode }) {
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
        <div className="w-full max-w-3xl">
          {children}
        </div>
      </div>
    </main>
  );
} 