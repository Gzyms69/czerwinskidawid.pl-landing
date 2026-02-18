import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Action {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface BentoCardProps {
  title: string;
  description?: string;
  content: ReactNode;
  action?: Action;
  additionalActions?: Action[];
  isTerminal?: boolean;
  glowColor?: "green" | "blue";
  className?: string;
}

export function BentoCard({
  title,
  description,
  content,
  action,
  additionalActions = [],
  isTerminal = false,
  glowColor = "green",
  className = "",
}: BentoCardProps) {
  const glowClass =
    glowColor === "green" ? "animate-glow-green" : "animate-glow-blue";
  const glowColorHex =
    glowColor === "green"
      ? "rgba(34, 197, 94, 0.1)"
      : "rgba(59, 130, 246, 0.1)";

  const allActions = action ? [action, ...additionalActions] : additionalActions;

  return (
    <motion.div
      className={`relative group overflow-hidden rounded-2xl ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${glowColorHex}, transparent 50%)`,
        }}
      />

      {/* Main card container */}
      <div className={`glass-card rounded-2xl p-6 sm:p-8 h-full relative z-10`}>
        {/* Terminal-like styling */}
        {isTerminal && (
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        )}

        {/* Content */}
        <div className="space-y-4">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h3>

          {description && (
            <motion.p
              className="text-zinc-400 text-sm sm:text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content}
          </motion.div>

          {allActions.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {allActions.map((act, idx) => {
                const buttonContent = (
                  <motion.button
                    key={idx}
                    className={`px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-300 ${
                      glowColor === "green"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/50"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/40 hover:shadow-lg hover:shadow-blue-500/50"
                    }`}
                    onClick={act.onClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {act.label}
                  </motion.button>
                );

                if (act.href) {
                  return (
                    <a 
                      key={idx} 
                      href={act.href} 
                      target={act.href.startsWith("http") ? "_blank" : undefined}
                      rel={act.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {buttonContent}
                    </a>
                  );
                }

                return buttonContent;
              })}
            </div>
          )}
        </div>
      </div>

      {/* Hover border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          border: `1px solid ${glowColor === "green" ? "rgba(34, 197, 94, 0.5)" : "rgba(59, 130, 246, 0.5)"}`,
        }}
      />
    </motion.div>
  );
}
