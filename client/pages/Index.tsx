import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AvatarWithStatus } from "@/components/AvatarWithStatus";
import { TypewriterEffect } from "@/components/TypewriterEffect";
import { BentoCard } from "@/components/BentoCard";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { Github, Linkedin, Copy, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function Index() {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const email = "dawidczerwinskipl@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy email");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Grid background */}
      <div className="grid-background" />

      {/* Vignette overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none z-20" />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section
          className="text-center space-y-6 sm:space-y-8 mb-20 sm:mb-32"
          variants={containerVariants}
        >
          {/* Avatar */}
          <motion.div
            className="flex justify-center"
            variants={itemVariants}
          >
            <AvatarWithStatus
              size="lg"
              status="online"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dawid&glasses=round_blue&hair=long_blonde&facial=goatee"
            />
          </motion.div>

          {/* Name with shimmer effect */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              <span className="neon-text-green">Dawid Czerwiński</span>
            </h1>
          </motion.div>

          {/* Typewriter Effect */}
          <motion.div
            className="text-xl sm:text-2xl font-mono text-zinc-300 h-10"
            variants={itemVariants}
          >
            <TypewriterEffect
              words={t.roles}
              typingSpeed={40}
              deletingSpeed={20}
              delayBetweenWords={3000}
              cursorClassName="ml-2"
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t.bio}
          </motion.p>
        </motion.section>

        {/* Bento Grid - Main Cards */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-32"
          variants={containerVariants}
        >
          {/* Card A: Portfolio */}
          <motion.div variants={itemVariants}>
            <Link to="/portfolio" className="block h-full">
              <BentoCard
                title={t.portfolio.title}
                description={t.portfolio.description}
                isTerminal
                glowColor="green"
                content={
                  <div className="space-y-4">
                    <div className="text-sm text-zinc-400 font-mono space-y-2">
                      <div className="text-emerald-500">
                        $ projects --list
                      </div>
                      <div className="text-zinc-300">
                        • WikiGraph
                        <span className="text-zinc-500"> - {t.portfolio.items.wikiGraph}</span>
                      </div>
                      <div className="text-zinc-300">
                        • Developer Portfolio Website
                        <span className="text-zinc-500">
                          {" "}
                          - {t.portfolio.items.portfolioSite}
                        </span>
                      </div>
                      <div className="text-zinc-300">
                        • Katalog & LeadFinder
                        <span className="text-zinc-500">
                          {" "}
                          - {t.portfolio.items.automationSuite}
                        </span>
                      </div>
                    </div>
                  </div>
                }
                action={{ label: t.portfolio.action }}
              />
            </Link>
          </motion.div>

          {/* Card B: Katalog */}
          <motion.div variants={itemVariants}>
            <Link to="/katalog" className="block h-full">
              <BentoCard
                title={t.katalog.title}
                description={t.katalog.description}
                glowColor="blue"
                content={
                  <div className="space-y-4">
                    <div className="text-sm text-zinc-400 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>LeadFinder</span>
                        <span className="text-zinc-600">
                          {t.katalog.items.leadFinder}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>Business Automation</span>
                        <span className="text-zinc-600">
                          {t.katalog.items.businessAutomation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>Web Templates</span>
                        <span className="text-zinc-600">
                          {t.katalog.items.webTemplates}
                        </span>
                      </div>
                    </div>
                  </div>
                }
                action={{ label: t.katalog.action }}
              />
            </Link>
          </motion.div>
        </motion.section>

        {/* Tech Stack Marquee */}
        <motion.section
          className="mb-20 sm:mb-32"
          variants={itemVariants}
        >
          <p className="text-center text-zinc-500 text-sm mb-6 font-mono">
            {t.techStack}
          </p>
          <TechStackMarquee />
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="border-t border-zinc-800 pt-8 sm:pt-12"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/gzyms69"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/dawid-czerwi%C5%84ski-baa6b5149/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>

            {/* Copy Email Button */}
            <motion.button
              onClick={handleCopyEmail}
              className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-2 font-mono text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-500" />
                  {t.footer.copied}
                </>
              ) : (
                <>
                  <Copy size={16} />
                  {email}
                </>
              )}
            </motion.button>

            {/* Copyright */}
            <p className="text-zinc-600 text-sm text-center sm:text-right">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}
