import { useLanguage } from "@/lib/i18n-context";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage("pl")}
        className={`p-2 rounded-lg border transition-all ${
          language === "pl"
            ? "bg-emerald-500/20 border-emerald-500 text-emerald-500"
            : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
        }`}
        aria-label="Switch to Polish"
      >
        <span className="text-xl">🇵🇱</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage("en")}
        className={`p-2 rounded-lg border transition-all ${
          language === "en"
            ? "bg-emerald-500/20 border-emerald-500 text-emerald-500"
            : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
        }`}
        aria-label="Switch to English"
      >
        <span className="text-xl">🇬🇧</span>
      </motion.button>
    </div>
  );
}
