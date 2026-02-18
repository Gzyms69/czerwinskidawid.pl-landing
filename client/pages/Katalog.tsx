import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Katalog() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <LanguageSwitcher />
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          {t.katalog.title}
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          {t.katalog.comingSoon}
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/40 transition-colors"
          >
            <ArrowLeft size={20} />
            {t.backToHome}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
