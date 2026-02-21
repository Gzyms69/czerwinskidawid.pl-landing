import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AvatarWithStatus } from "@/components/AvatarWithStatus";
import { TypewriterEffect } from "@/components/TypewriterEffect";
import { Github, Linkedin, Copy, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Lazy Load heavy components
const GlobalSpotlight = lazy(() => import("@/components/GlobalSpotlight"));
const ProjectCard = lazy(() => import("@/components/ProjectCard").then(module => ({ default: module.ProjectCard })));
const TechStackMarquee = lazy(() => import("@/components/TechStackMarquee").then(module => ({ default: module.TechStackMarquee })));

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const email = "dawidczerwinskipl@gmail.com";
  const gridRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy email");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in sections on scroll
      const sections = gsap.utils.toArray(".fade-in-section");
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      
      // Stagger Bento Cards
      // We need to wait for cards to be mounted, but since they are lazy loaded, 
      // the initial GSAP run might miss them.
      // However, Suspense boundaries will handle the mounting. 
      // We can use a small delay or check for existence, or rely on ScrollTrigger's refresh()
      
      // For now, let's keep the stagger logic, but it might need to run after lazy load.
      // A better approach with lazy loading is to let the component animate itself in,
      // or use a wrapper that is present in the DOM.
      
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-black text-white overflow-hidden relative">
      <Suspense fallback={null}>
        <GlobalSpotlight containerRef={gridRef} spotlightRadius={500} glowColor="16, 185, 129" />
      </Suspense>

      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Grid background */}
      <div className="grid-background" />

      {/* Vignette overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none z-20" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        
        {/* Hero Section - CSS Animated (Immediate Paint) */}
        <section className="text-center space-y-6 sm:space-y-8 mb-20 sm:mb-32">
          {/* Avatar */}
          <div className="flex justify-center animate-in-fade delay-0">
            <AvatarWithStatus
              size="lg"
              status="online"
              src="/dawid.webp"
            />
          </div>

          {/* Name with shimmer effect */}
          <div className="animate-in-fade delay-100">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              <span className="neon-text-green">Dawid Czerwiński</span>
            </h1>
          </div>

          {/* Typewriter Effect */}
          <div className="text-xl sm:text-2xl font-mono text-zinc-300 h-10 animate-in-fade delay-200">
            <TypewriterEffect
              words={t.roles}
              typingSpeed={40}
              deletingSpeed={20}
              delayBetweenWords={3000}
              cursorClassName="ml-2"
            />
          </div>

          {/* Bio */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-in-fade delay-300">
            {t.bio}
          </p>
        </section>

        {/* Bento Grid - Main Cards */}
        <section
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-32 relative"
        >
          {/* Card A: Portfolio */}
          <div className="bento-card-item h-full">
            <a href="/portfolio" className="block h-full">
              <Suspense fallback={<div className="h-[400px] w-full bg-zinc-900/50 rounded-2xl animate-pulse" />}>
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
              </Suspense>
            </a>
          </div>

          {/* Card B: Katalog */}
          <div className="bento-card-item h-full">
            <div className="h-full">
              <Suspense fallback={<div className="h-[400px] w-full bg-zinc-900/50 rounded-2xl animate-pulse" />}>
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
              </Suspense>
            </div>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="fade-in-section mb-20 sm:mb-32">
          <p className="text-center text-zinc-500 text-sm mb-6 font-mono">
            {t.techStack}
          </p>
          <Suspense fallback={<div className="h-32 w-full bg-zinc-900/20 animate-pulse border-y border-zinc-800" />}>
            <TechStackMarquee />
          </Suspense>
        </section>

        {/* Footer */}
        <footer className="fade-in-section border-t border-zinc-800 pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/gzyms69"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors transform hover:scale-110 active:scale-95"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/dawid-czerwi%C5%84ski-baa6b5149/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors transform hover:scale-110 active:scale-95"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-2 font-mono text-sm transform hover:scale-105 active:scale-95"
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
            </button>

            {/* Copyright */}
            <p className="text-zinc-600 text-sm text-center sm:text-right">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
