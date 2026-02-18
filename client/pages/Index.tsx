import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AvatarWithStatus } from "@/components/AvatarWithStatus";
import { TypewriterEffect } from "@/components/TypewriterEffect";
import { ProjectCard } from "@/components/ProjectCard";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { Github, Linkedin, Copy, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import PixelTrail from "@/components/PixelTrail";

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
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <PixelTrail
          gridSize={100}
          trailSize={0.1}
          maxAge={450}
          interpolate={2.7}
          color="#29ff7b"
          gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
          className="pointer-events-auto"
        />
      </div>

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
              src="/dawid.jpg"
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
            <a href="/portfolio" className="block h-full">
              <ProjectCard
                title={t.portfolio.title}
                description={t.portfolio.description}
                glowColor="green"
                command="$ projects --list"
                items={[
                  { name: "WikiGraph Lab", description: t.portfolio.items.wikiGraphLab },
                  { name: "LeadFinder & Katalog Ecosystem", description: t.portfolio.items.leadFinderEcosystem },
                  { name: "ROMHub", description: t.portfolio.items.romHub },
                ]}
                actions={[{ label: t.portfolio.action }]}
              />
            </a>
          </motion.div>

          {/* Card B: Katalog */}
          <motion.div variants={itemVariants}>
            <div className="h-full">
              <ProjectCard
                title={t.katalog.title}
                description={t.katalog.description}
                glowColor="blue"
                command="$ solutions --list"
                items={[
                  { name: "Web Templates", description: t.katalog.items.webTemplates },
                  { name: "Business Automation", description: t.katalog.items.businessAutomation },
                  { name: "LeadFinder", description: t.katalog.items.leadFinder },
                ]}
                actions={[
                  { 
                    label: t.katalog.action,
                    onClick: () => window.location.href = "/katalog"
                  },
                  { 
                    label: t.katalog.checkLeadFinder,
                    href: "https://github.com/Gzyms69/LeadFinder"
                  }
                ]}
              />
            </div>
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
