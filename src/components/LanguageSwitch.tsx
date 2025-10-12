import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
];

interface LanguageSwitchProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSwitch = ({ currentLanguage, onLanguageChange }: LanguageSwitchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{current.flag}</span>
        <span className="hidden sm:inline">{current.name}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border z-50 min-w-[160px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 ${
                language.code === currentLanguage ? 'bg-gray-50 font-medium' : ''
              } first:rounded-t-lg last:rounded-b-lg`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-gray-900">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;