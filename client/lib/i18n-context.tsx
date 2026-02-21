import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "pl" | "en";

interface Translations {
  roles: string[];
  bio: string;
  portfolio: {
    title: string;
    description: string;
    action: string;
    items: {
      wikiGraphLab: string;
      leadFinderEcosystem: string;
      romHub: string;
    };
    comingSoon: string;
  };
  katalog: {
    title: string;
    description: string;
    action: string;
    checkLeadFinder: string;
    items: {
      leadFinder: string;
      businessAutomation: string;
      webTemplates: string;
    };
    comingSoon: string;
    toast: string;
  };
  techStack: string;
  footer: {
    copied: string;
    copyright: string;
  };
  backToHome: string;
}

const translations: Record<Language, Translations> = {
  pl: {
    roles: [
      "Junior Software Engineer",
      "Ekspert Wsparcia L2",
      "Inżynier Automatyzacji",
    ],
    bio: "Łączę dyscyplinę operacyjną z kreatywną inżynierią. Mieszkam w Krakowie.",
    portfolio: {
      title: "Portfolio",
      description: "Poznaj moje projekty techniczne i inżynierskie.",
      action: "> Uruchom Portfolio",
      items: {
        wikiGraphLab: "Silnik grafu wiedzy. Hybrydowa struktura Neo4j + SQLite.",
        leadFinderEcosystem: "Kompletny pipeline automatyzacji sprzedaży (Scraping + Next.js).",
        romHub: "Emulator N64 w przeglądarce działający po stronie klienta (WASM).",
      },
      comingSoon:
        "Ta strona pojawi się wkrótce! Twoje Portfolio z projektami WikiGraph, Katalog i LeadFinder zostanie tu zaprezentowane.",
    },
    katalog: {
      title: "Katalog & LeadFinder",
      description: "Odkryj automatyzację biznesową i nowoczesny marketplace szablonów.",
      action: "> Przeglądaj Katalog",
      checkLeadFinder: "> Sprawdź LeadFinder",
      items: {
        webTemplates: "Gotowe komponenty i wzory stron",
        businessAutomation: "Pełna automatyzacja marketingu",
        leadFinder: "Generowanie magicznych URL i szukanie klientów",
      },
      comingSoon:
        "Ta strona pojawi się wkrótce! Katalog z LeadFinder, Automatyzacją Biznesową i Szablonami Webowymi będzie dostępny tutaj.",
      toast: "Jeszcze w budowie. Zapraszam wkrótce!",
    },
    techStack: "Technologie",
    footer: {
      copied: "Skopiowano!",
      copyright: "Dawid Czerwiński",
    },
    backToHome: "Powrót do strony głównej",
  },
  en: {
    roles: ["Junior Software Engineer", "Support L2 Expert", "Automation Engineer"],
    bio: "Bridging the gap between operational discipline and creative engineering. Based in Kraków.",
    portfolio: {
      title: "Portfolio",
      description: "Explore my technical projects and engineering work.",
      action: "> Launch Portfolio",
      items: {
        wikiGraphLab: "Knowledge Graph engine. Hybrid Neo4j + SQLite structure.",
        leadFinderEcosystem: "End-to-end sales automation pipeline (Scraping + Next.js).",
        romHub: "Browser-based N64 emulator running on the client side (WASM).",
      },
      comingSoon:
        "This page is coming soon! Your Developer Portfolio Website with WikiGraph, Katalog & LeadFinder projects will be showcased here.",
    },
    katalog: {
      title: "Katalog & LeadFinder",
      description: "Discover business automation and modern template marketplace.",
      action: "> Explore Catalog",
      checkLeadFinder: "> Check LeadFinder",
      items: {
        webTemplates: "Ready-to-use components and templates",
        businessAutomation: "Full marketing automation",
        leadFinder: "Magic URL generation and prospecting",
      },
      comingSoon:
        "This page is coming soon! The Katalog with LeadFinder, Business Automation, and Web Templates will be available here.",
      toast: "Work in progress. Coming soon!",
    },
    techStack: "Tech Stack",
    footer: {
      copied: "Copied!",
      copyright: "Dawid Czerwiński",
    },
    backToHome: "Back to Home",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pl");

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
