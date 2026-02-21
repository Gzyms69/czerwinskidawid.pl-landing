import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <LanguageSwitcher />
      <div className="text-center max-w-2xl animate-in-fade">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          {t.portfolio.title}
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          {t.portfolio.comingSoon}
        </p>

        <div className="transition-transform hover:scale-105 active:scale-95">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/40 transition-colors"
          >
            <ArrowLeft size={20} />
            {t.backToHome}
          </a>
        </div>
      </div>
    </div>
  );
}
