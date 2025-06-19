"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { FaCogs, FaShieldAlt, FaUsers, FaQuoteLeft, FaDiscord, FaInstagram, FaGlobe, FaInfoCircle, FaLock } from "react-icons/fa";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

function AnimatedParticlesBG() {
  // Gerar posições e tamanhos fixos para as partículas
  const particles = [
    { left: '10%', top: '20%', size: 90, delay: 0 },
    { left: '30%', top: '60%', size: 70, delay: 1 },
    { left: '50%', top: '40%', size: 110, delay: 2 },
    { left: '70%', top: '30%', size: 80, delay: 0.5 },
    { left: '80%', top: '70%', size: 100, delay: 1.5 },
    { left: '20%', top: '80%', size: 60, delay: 2.5 },
    { left: '60%', top: '15%', size: 75, delay: 1.2 },
    { left: '85%', top: '10%', size: 65, delay: 0.8 },
    { left: '40%', top: '75%', size: 95, delay: 1.8 },
    { left: '15%', top: '50%', size: 85, delay: 2.2 },
  ];
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-700 to-blue-500 opacity-15 blur-xl"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f7fa] via-[#e9e3f7] to-[#f3eaff] opacity-90" />
    </div>
  );
}

export default function Home() {
  const { t, i18n } = useTranslation("common", { useSuspense: false });
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch("/api/visitas", { method: "POST" });
  }, []);

  const changeLanguage = (lng: string) => {
    if (typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lng).then(() => {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-white text-neutral-900 overflow-x-hidden">
      <AnimatedParticlesBG />
      <div className="w-full flex flex-col items-center justify-center px-4 pt-24 pb-16 max-w-2xl mx-auto relative z-10">
        {/* Logo animada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 flex justify-center"
        >
          <Image src="/logo.svg" alt="9M Logo" width={80} height={80} priority />
        </motion.div>
        {/* Título animado */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-extrabold text-center text-fuchsia-700 mb-4 select-none drop-shadow-lg"
        >
          9M Vazamentos
        </motion.h1>
        {/* Subtítulo animado */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-2xl text-center text-neutral-700 mb-10"
        >
          {t("hero_subtitle") !== "hero_subtitle"
            ? t("hero_subtitle")
            : i18n.language === "pt"
            ? "A 9M Vazamentos é a plataforma definitiva para automação, segurança e gestão de comunidades no Discord brasileiro. Descubra ferramentas exclusivas, analytics avançados e suporte premium para elevar seu servidor ao próximo nível."
            : "9M Vazamentos is the ultimate platform for automation, security, and community management on Brazilian Discord. Discover exclusive tools, advanced analytics, and premium support to take your server to the next level."}
        </motion.p>
        {/* Botão principal: Acessar Dashboard com login integrado */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.09, boxShadow: "0 0 40px 10px #a259f7" }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg border-2 border-fuchsia-600 text-white bg-gradient-to-r from-fuchsia-700 to-purple-700 shadow-lg hover:bg-fuchsia-800 transition-all text-center flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40"
            tabIndex={0}
            aria-label="Acessar Dashboard"
            onClick={() => {
              if (status === "authenticated") {
                router.push("/dashboard");
              } else {
                signIn("discord");
              }
            }}
          >
            <FaLock className="mr-2 text-xl" /> Acessar Dashboard
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.07, boxShadow: "0 0 40px 10px #a259f7" }}
            whileTap={{ scale: 0.98 }}
            href="https://discord.gg/FMvB3uyE"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md hover:from-fuchsia-700 hover:to-purple-700 transition-all text-center relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40"
            tabIndex={0}
            aria-label="Entrar no Discord"
          >
            <span className="relative z-10">Discord</span>
            <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-400/30 to-purple-400/30 blur-lg opacity-60 animate-pulse" />
          </motion.a>
        </div>
        {/* Selo de confiança */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaShieldAlt className="text-fuchsia-600 text-2xl" />
          <span className="text-fuchsia-700 font-bold text-base">Site seguro e verificado para assinantes</span>
        </div>
        {/* Destaques para assinantes */}
        <section className="w-full max-w-4xl mx-auto mt-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-3 border-t-4 border-fuchsia-500">
            <FaLock className="text-4xl text-fuchsia-600 mb-2" />
            <span className="font-bold text-lg text-fuchsia-700">Recursos Exclusivos</span>
            <span className="text-neutral-600 text-center">Acesso a ferramentas premium e funcionalidades avançadas só para assinantes.</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-3 border-t-4 border-purple-500">
            <FaCogs className="text-4xl text-fuchsia-600 mb-2" />
            <span className="font-bold text-lg text-fuchsia-700">Suporte Prioritário</span>
            <span className="text-neutral-600 text-center">Atendimento rápido e dedicado para resolver qualquer dúvida ou problema.</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-3 border-t-4 border-blue-500">
            <FaUsers className="text-4xl text-fuchsia-600 mb-2" />
            <span className="font-bold text-lg text-fuchsia-700">Novidades Constantes</span>
            <span className="text-neutral-600 text-center">Atualizações frequentes e novidades para manter seu servidor sempre à frente.</span>
          </motion.div>
        </section>
        {/* Seção de novidades */}
        <section className="w-full max-w-3xl mx-auto mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-2xl md:text-3xl font-bold text-center text-fuchsia-700 mb-8 flex items-center justify-center gap-2"><FaInfoCircle /> Novidades</motion.h2>
          <motion.ul initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="flex flex-col gap-4 text-neutral-700 text-lg">
            <li>🔒 Novo sistema de alertas de vazamento em tempo real.</li>
            <li>🤖 Integração com comandos automáticos e analytics avançados.</li>
            <li>🎨 Painel totalmente personalizável para sua equipe.</li>
            <li>📱 Experiência mobile aprimorada e responsiva.</li>
          </motion.ul>
        </section>
        {/* Seção de depoimentos */}
        <section className="w-full max-w-3xl mx-auto mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-2xl md:text-3xl font-bold text-center text-fuchsia-700 mb-8 flex items-center justify-center gap-2"><FaQuoteLeft /> Depoimentos</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-fuchsia-500">
              <p className="text-neutral-700 italic mb-2">“A 9M revolucionou a segurança do meu servidor. Recomendo para todos!”</p>
              <span className="font-bold text-fuchsia-700">@adminbr</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-fuchsia-500">
              <p className="text-neutral-700 italic mb-2">“Ferramentas fáceis de usar e suporte incrível. Nunca mais troco!”</p>
              <span className="font-bold text-fuchsia-700">@gamerpro</span>
            </motion.div>
          </div>
        </section>
        {/* Seletor de idioma animado */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
          className="flex gap-2 mt-8 justify-center"
        >
          <button
            className={`px-4 py-2 rounded-lg font-bold text-base border-2 border-fuchsia-400/40 transition-all ${i18n.language === "pt" ? "bg-fuchsia-700 text-white" : "bg-white text-fuchsia-700"}`}
            onClick={() => changeLanguage("pt")}
          >
            PT
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold text-base border-2 border-fuchsia-400/40 transition-all ${i18n.language === "en" ? "bg-fuchsia-700 text-white" : "bg-white text-fuchsia-700"}`}
            onClick={() => changeLanguage("en")}
          >
            EN
          </button>
        </motion.div>
      </div>
      {/* Rodapé */}
      <footer className="w-full bg-gradient-to-r from-fuchsia-100 via-purple-100 to-blue-100 py-8 mt-12 flex flex-col items-center gap-4 text-fuchsia-700 text-center">
        <div className="flex gap-6 text-2xl mb-2">
          <a href="https://discord.gg/FMvB3uyE" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-500"><FaDiscord /></a>
          <a href="https://instagram.com/9mvazamentos" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-500"><FaInstagram /></a>
          <a href="https://9mvazamentos.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-500"><FaGlobe /></a>
        </div>
        <span className="text-sm">© {new Date().getFullYear()} 9M Vazamentos. Todos os direitos reservados.</span>
      </footer>
    </main>
  );
}
