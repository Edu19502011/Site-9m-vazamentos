"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaUserFriends, FaEye, FaLock, FaCopy, FaInfoCircle } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function ParticlesBG() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
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

export default function Dashboard() {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [discordMembers, setDiscordMembers] = useState<number | null>(null);
  const [visitas, setVisitas] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    fetch("/api/discord/members")
      .then((res) => res.json())
      .then((data) => setDiscordMembers(data.members))
      .catch(() => setDiscordMembers(null));
  }, []);

  useEffect(() => {
    fetch("/api/visitas")
      .then((res) => res.json())
      .then((data) => setVisitas(data.total))
      .catch(() => setVisitas(null));
  }, []);

  if (!session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0025] via-[#3a0ca3] to-[#7209b7] text-white">
        <div className="text-center mt-20 text-xl mb-8">Você não está autenticado. Faça login para acessar todos os recursos.</div>
        <button
          onClick={() => signIn("discord")}
          className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md hover:from-fuchsia-700 hover:to-purple-700 transition-all"
        >
          Fazer Login
        </button>
      </main>
    );
  }

  if (!session) return null;

  // Exemplo de dados para o gráfico
  const visitasData = [
    { dia: "Seg", visitas: 120 },
    { dia: "Ter", visitas: 180 },
    { dia: "Qua", visitas: 150 },
    { dia: "Qui", visitas: 200 },
    { dia: "Sex", visitas: 250 },
    { dia: "Sáb", visitas: 300 },
    { dia: "Dom", visitas: 220 },
  ];

  // Função para copiar e-mail
  const copyEmail = () => {
    if (session.user?.email) {
      navigator.clipboard.writeText(session.user.email);
      alert("E-mail copiado!");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0025] via-[#3a0ca3] to-[#7209b7] text-white overflow-hidden px-2">
      <ParticlesBG />
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-10 z-10 w-full max-w-3xl px-4 py-12"
      >
        {/* Mensagem de boas-vindas */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-white via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_#a259f7] animate-pulse select-none mb-2">
          Bem-vindo de volta, {session.user?.name?.split(" ")[0] || "usuário"}!
        </h1>
        {/* Avatar, nome e e-mail */}
        <div className="flex flex-col items-center gap-2 bg-black/60 rounded-2xl shadow-2xl p-8 w-full border-2 border-fuchsia-700/30">
          {session.user?.image && (
            <img src={session.user.image} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-fuchsia-700 shadow-lg mb-2" />
          )}
          <span className="text-2xl font-bold text-white drop-shadow-lg">{session.user?.name}</span>
          <span className="text-fuchsia-300 font-mono flex items-center gap-2">{t("user_email")}: {session.user?.email}
            <button onClick={copyEmail} title="Copiar e-mail" className="ml-2 text-fuchsia-400 hover:text-fuchsia-200"><FaCopy /></button>
          </span>
        </div>
        {/* Cards de informações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-900/80 via-purple-900/80 to-blue-900/80 rounded-2xl p-8 shadow-xl border-2 border-fuchsia-700/30"
          >
            <FaUserFriends className="text-4xl text-fuchsia-400 mb-2" />
            <span className="text-lg font-bold text-fuchsia-200 mb-1">{t("discord_members")}</span>
            <span className="text-3xl font-extrabold text-white drop-shadow-lg">{discordMembers === null ? "..." : discordMembers}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-900/80 via-purple-900/80 to-blue-900/80 rounded-2xl p-8 shadow-xl border-2 border-fuchsia-700/30"
          >
            <FaLock className="text-4xl text-fuchsia-400 mb-2" />
            <span className="text-lg font-bold text-fuchsia-200 mb-1">{t("leaks_captured")}</span>
            <span className="text-3xl font-extrabold text-white drop-shadow-lg">--</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-900/80 via-purple-900/80 to-blue-900/80 rounded-2xl p-8 shadow-xl border-2 border-fuchsia-700/30"
          >
            <FaEye className="text-4xl text-fuchsia-400 mb-2" />
            <span className="text-lg font-bold text-fuchsia-200 mb-1">{t("site_visits")}</span>
            <span className="text-3xl font-extrabold text-white drop-shadow-lg">{visitas === null ? "..." : visitas}</span>
          </motion.div>
        </div>
        {/* Gráfico animado de visitas */}
        <div className="w-full bg-black/50 rounded-2xl p-6 shadow-xl border-2 border-fuchsia-700/20 mt-4">
          <h2 className="text-lg font-bold mb-4 text-fuchsia-200 flex items-center gap-2"><FaEye /> Gráfico de visitas (exemplo)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={visitasData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#a259f7" opacity={0.1} />
              <XAxis dataKey="dia" stroke="#fff" fontSize={14} tickLine={false} axisLine={false} />
              <YAxis stroke="#fff" fontSize={14} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#2d0066', border: 'none', color: '#fff' }} />
              <Line type="monotone" dataKey="visitas" stroke="#a259f7" strokeWidth={3} dot={{ r: 5, fill: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Dicas rápidas / novidades */}
        <div className="w-full bg-gradient-to-r from-fuchsia-800/60 via-purple-800/60 to-blue-800/60 rounded-2xl p-6 shadow-xl border-2 border-fuchsia-700/20 mt-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold mb-2 text-fuchsia-200 flex items-center gap-2"><FaInfoCircle /> Novidades & Dicas</h2>
          <ul className="list-disc pl-6 text-fuchsia-100 text-base">
            <li>Explore os comandos avançados para automação do seu servidor.</li>
            <li>Ative notificações para receber alertas de vazamentos em tempo real.</li>
            <li>Personalize o painel nas configurações para uma experiência única.</li>
          </ul>
        </div>
        {/* Mensagem de analytics */}
        <span className="mt-2 text-xs text-fuchsia-400 text-center">{t("analytics_soon")}</span>
        {/* Botão de logout */}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-fuchsia-700 via-purple-700 to-blue-700 hover:from-fuchsia-500 hover:to-purple-800 transition-all text-white font-extrabold shadow-2xl text-lg border-2 border-white/10 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40"
        >
          {t("logout")}
        </motion.button>
      </motion.div>
    </main>
  );
} 