"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type Lang = "pt" | "en";
type Comando = {
  nome: Record<Lang, string>;
  descricao: Record<Lang, string>;
  categoria: Record<Lang, string>;
};

function ParticlesBG() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-500 opacity-20 blur-2xl"
          style={{
            width: `${60 + Math.random() * 100}px`,
            height: `${60 + Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 80 - 40, 0],
            x: [0, Math.random() * 80 - 40, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

const comandos: Comando[] = [
  {
    nome: { pt: "Extrair Mensagens", en: "Extract Messages" },
    descricao: {
      pt: "Baixe todas as mensagens de um canal ou servidor.",
      en: "Download all messages from a channel or server.",
    },
    categoria: { pt: "Mensagens", en: "Messages" },
  },
  {
    nome: { pt: "Clonar Servidores", en: "Clone Servers" },
    descricao: {
      pt: "Clone rapidamente a estrutura de qualquer servidor Discord.",
      en: "Quickly clone the structure of any Discord server.",
    },
    categoria: { pt: "Administração", en: "Administration" },
  },
  {
    nome: { pt: "Limpar Servidor", en: "Clean Server" },
    descricao: {
      pt: "Remova canais, mensagens e membros indesejados com um clique.",
      en: "Remove channels, messages, and unwanted members with one click.",
    },
    categoria: { pt: "Administração", en: "Administration" },
  },
  {
    nome: { pt: "Disparo DM", en: "DM Blast" },
    descricao: {
      pt: "Envie mensagens diretas em massa para membros do servidor.",
      en: "Send mass direct messages to server members.",
    },
    categoria: { pt: "Mensagens", en: "Messages" },
  },
  {
    nome: { pt: "Ataque em Massa", en: "Mass Attack" },
    descricao: {
      pt: "Ferramenta avançada para testes de stress em servidores.",
      en: "Advanced tool for server stress testing.",
    },
    categoria: { pt: "Avançado", en: "Advanced" },
  },
  {
    nome: { pt: "Floodar Canais", en: "Flood Channels" },
    descricao: {
      pt: "Envie múltiplas mensagens rapidamente em canais selecionados.",
      en: "Send multiple messages quickly in selected channels.",
    },
    categoria: { pt: "Mensagens", en: "Messages" },
  },
  {
    nome: { pt: "Expulsar Todos", en: "Kick All" },
    descricao: {
      pt: "Expulse todos os membros do servidor instantaneamente.",
      en: "Instantly kick all members from the server.",
    },
    categoria: { pt: "Administração", en: "Administration" },
  },
  {
    nome: { pt: "Banir Todos", en: "Ban All" },
    descricao: {
      pt: "Banimento em massa de membros do servidor.",
      en: "Mass ban of server members.",
    },
    categoria: { pt: "Administração", en: "Administration" },
  },
  {
    nome: { pt: "Limpar DMs", en: "Clean DMs" },
    descricao: {
      pt: "Limpe todas as mensagens diretas do seu Discord.",
      en: "Clean all your Discord direct messages.",
    },
    categoria: { pt: "Mensagens", en: "Messages" },
  },
  {
    nome: { pt: "Fechar DMs", en: "Close DMs" },
    descricao: {
      pt: "Feche todas as DMs abertas rapidamente.",
      en: "Quickly close all open DMs.",
    },
    categoria: { pt: "Mensagens", en: "Messages" },
  },
  {
    nome: { pt: "Remover Amigos", en: "Remove Friends" },
    descricao: {
      pt: "Remova todos os amigos da sua conta Discord.",
      en: "Remove all friends from your Discord account.",
    },
    categoria: { pt: "Conta", en: "Account" },
  },
  {
    nome: { pt: "Sair de Servidores", en: "Leave Servers" },
    descricao: {
      pt: "Saia de todos os servidores em que está presente.",
      en: "Leave all servers you are in.",
    },
    categoria: { pt: "Conta", en: "Account" },
  },
];

export default function Comandos() {
  const { t, i18n } = useTranslation("common");
  const [busca, setBusca] = useState("");
  const lang = (i18n.language as Lang) || "pt";
  const comandosFiltrados = comandos.filter((cmd) =>
    cmd.nome[lang].toLowerCase().includes(busca.toLowerCase()) ||
    cmd.descricao[lang].toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#1a0025] via-[#3a0ca3] to-[#7209b7] text-white p-8 flex flex-col items-center overflow-hidden">
      <ParticlesBG />
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-4xl md:text-6xl font-extrabold mb-8 text-center bg-gradient-to-r from-white via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_#a259f7] animate-pulse"
      >
        {t("commands_tools")}
      </motion.h1>
      <motion.input
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        type="text"
        placeholder={t("search_command")}
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="mb-8 px-6 py-3 rounded-xl bg-black/60 border border-purple-700 text-white w-full max-w-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-lg"
      />
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10">
        {comandosFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-fuchsia-400 text-lg bg-black/40 rounded-xl p-6 shadow-lg"
          >
            {t("no_command_found")}
          </motion.div>
        )}
        {comandosFiltrados.map((cmd, i) => (
          <motion.div
            key={cmd.nome[lang]}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/10 backdrop-blur-xl border-2 border-fuchsia-700/30 rounded-2xl p-7 shadow-2xl flex flex-col gap-2 hover:scale-105 hover:border-fuchsia-400 transition-transform cursor-pointer group relative overflow-hidden"
          >
            <span className="absolute right-4 top-4 text-xs bg-fuchsia-700/80 text-white px-3 py-1 rounded-full shadow group-hover:bg-fuchsia-400 group-hover:text-fuchsia-900 transition-all">
              {cmd.categoria[lang]}
            </span>
            <h2 className="text-2xl font-bold text-fuchsia-100 drop-shadow-lg group-hover:text-fuchsia-300 transition-all">
              {cmd.nome[lang]}
            </h2>
            <p className="text-fuchsia-200 group-hover:text-white transition-all">
              {cmd.descricao[lang]}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
} 