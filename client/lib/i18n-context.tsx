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
      wikiGraph: string;
      portfolioSite: string;
      automationSuite: string;
    };
    comingSoon: string;
  };
  katalog: {
    title: string;
    description: string;
    action: string;
    items: {
      leadFinder: string;
      businessAutomation: string;
      webTemplates: string;
    };
    comingSoon: string;
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
      "Programista Solo",
      "Ekspert Wsparcia L2",
      "Inżynier Automatyzacji",
    ],
    bio: "Łączę dyscyplinę operacyjną z kreatywną inżynierią. Mieszkam w Krakowie.",
    portfolio: {
      title: "Portfolio",
      description: "Poznaj moje projekty techniczne i inżynierskie.",
      action: "> Uruchom Portfolio",
      items: {
        wikiGraph: "Baza grafowa",
        portfolioSite: "Strona portfolio",
        automationSuite: "Pakiet automatyzacji",
      },
      comingSoon:
        "Ta strona pojawi się wkrótce! Twoje Portfolio z projektami WikiGraph, Katalog i LeadFinder zostanie tu zaprezentowane.",
    },
    katalog: {
      title: "Katalog",
      description: "Odkryj automatyzację biznesową i rozwiązania webowe",
      action: "> Przeglądaj Katalog",
      items: {
        leadFinder: "System generowania leadów",
        businessAutomation: "Optymalizacja przepływu pracy",
        webTemplates: "Gotowe komponenty",
      },
      comingSoon:
        "Ta strona pojawi się wkrótce! Katalog z LeadFinder, Automatyzacją Biznesową i Szablonami Webowymi będzie dostępny tutaj.",
    },
    techStack: "Technologie",
    footer: {
      copied: "Skopiowano!",
      copyright: "Dawid Czerwiński",
    },
    backToHome: "Powrót do strony głównej",
  },
  en: {
    roles: ["Solo Developer", "Support L2 Expert", "Automation Engineer"],
    bio: "Bridging the gap between operational discipline and creative engineering. Based in Kraków.",
    portfolio: {
      title: "Portfolio",
      description: "Explore my technical projects and engineering work.",
      action: "> Launch Portfolio",
      items: {
        wikiGraph: "Graph database",
        portfolioSite: "Portfolio site",
        automationSuite: "Automation suite",
      },
      comingSoon:
        "This page is coming soon! Your Developer Portfolio Website with WikiGraph, Katalog & LeadFinder projects will be showcased here.",
    },
    katalog: {
      title: "Katalog",
      description: "Discover business automation and web solutions",
      action: "> Explore Catalog",
      items: {
        leadFinder: "Lead generation system",
        businessAutomation: "Workflow optimization",
        webTemplates: "Ready-to-use components",
      },
      comingSoon:
        "This page is coming soon! The Katalog with LeadFinder, Business Automation, and Web Templates will be available here.",
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
