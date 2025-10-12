import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";

const TikTokCTA = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-md">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Logo width={280} height={120} className="drop-shadow-lg" />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-black">
          Ingresa a{" "}
          <span className="text-gradient-red">sapsap.me</span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-bold mb-12 leading-relaxed text-black">
          y anotate{" "}
          <span className="text-gradient-cyan">gratis</span>{" "}
          en la lista{" "}
          <span className="text-gradient-red">prelanzamiento</span>
        </p>

        {/* CTA Button */}
        <div className="space-y-6">
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-2xl py-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300"
            onClick={() => window.open('https://sapsap.me', '_blank')}
          >
            <Mail className="mr-3 h-6 w-6" />
            sapsap.me
          </Button>
          
          <p className="text-lg text-gray-600 font-semibold">
            🎯 Acceso anticipado • 🚀 Lanzamiento exclusivo
          </p>
        </div>
      </div>
    </div>
  );
};

export default TikTokCTA;