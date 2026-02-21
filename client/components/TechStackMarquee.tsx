import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  Code2,
  Database,
  Server,
  Zap,
  Box,
  GitBranch,
  Search,
} from "lucide-react";

interface TechItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const techItems: TechItem[] = [
  { name: "Python", icon: <Code2 size={32} />, color: "text-blue-400" },
  { name: "Docker", icon: <Box size={32} />, color: "text-blue-500" },
  { name: "Linux", icon: <Server size={32} />, color: "text-orange-400" },
  { name: "Neo4j", icon: <Database size={32} />, color: "text-cyan-400" },
  { name: "Next.js", icon: <Zap size={32} />, color: "text-white" },
  { name: "React", icon: <Code2 size={32} />, color: "text-cyan-400" },
  { name: "SQL", icon: <Database size={32} />, color: "text-amber-500" },
  { name: "Git", icon: <GitBranch size={32} />, color: "text-orange-500" },
  { name: "Search", icon: <Search size={32} />, color: "text-green-400" },
];

export function TechStackMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-group", {
        x: "-100%",
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden bg-black/50 backdrop-blur-sm border-t border-b border-zinc-800 py-12 relative"
    >
      {/* Edge fading mask */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, black 0%, transparent 15%, transparent 85%, black 100%)",
        }}
      />
      
      {/* Twin Loop Container */}
      <div className="flex whitespace-nowrap">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}

function MarqueeGroup() {
  return (
    <div
      className="marquee-group flex items-center gap-16 pr-16 shrink-0 min-w-full justify-around"
    >
      {techItems.map((tech, index) => (
        <div
          key={`${tech.name}-${index}`}
          className="flex flex-col items-center gap-3 group transition-all duration-300"
        >
          <div
            className={`${tech.color} transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]`}
          >
            {tech.icon}
          </div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
