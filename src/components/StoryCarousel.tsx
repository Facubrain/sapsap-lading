import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import coverGenteToxica from "@/assets/covers/gente-toxica.jpeg";
import coverMiVerano from "@/assets/covers/mi-verano-mis-reglas.png";
import coverRioDeJaneiro from "@/assets/covers/rio-de-janeiro-otra-vez.jpeg";
import coverVanPorLasVegas from "@/assets/covers/van-por-las-vegas.jpeg";
import coverAtlantaAdventure from "@/assets/covers/Atlanta adventure.jpeg";
import coverAwakingCordoba from "@/assets/covers/awakingcordoba.jpg";
import storySpanish from "@/assets/story-spanish.jpg";
import storyFrench from "@/assets/story-french.jpg";
import storyEnglish from "@/assets/story-english.jpg";
import storyJapanese from "@/assets/story-japanese.jpg";

const simulations = [
  {
    title: "Realidad Tóxica",
    language: "Español",
    level: "Principiante",
    image: coverGenteToxica,
    genre: "Simulación Social",
  },
  {
    title: "Verano Infinito",
    language: "Español",
    level: "Intermedio",
    image: coverMiVerano,
    genre: "Realidad Alternativa",
  },
  {
    title: "Rio Paralelo",
    language: "Português",
    level: "Intermedio",
    image: coverRioDeJaneiro,
    genre: "Mundo Espejo",
  },
  {
    title: "Vegas Dimension",
    language: "English",
    level: "Intermedio",
    image: coverVanPorLasVegas,
    genre: "Realidad Distorsionada",
  },
  {
    title: "Atlanta Nexus",
    language: "English",
    level: "Intermedio",
    image: coverAtlantaAdventure,
    genre: "Portal Urbano",
  },
  {
    title: "Córdoba Cuántica",
    language: "Español",
    level: "Intermedio",
    image: coverAwakingCordoba,
    genre: "Realidad Fragmentada",
  },
  {
    title: "Madrid Multiverso",
    language: "Español",
    level: "Intermedio",
    image: storySpanish,
    genre: "Simulación Paranormal",
  },
  {
    title: "Paris Éternel",
    language: "Français",
    level: "Principiante",
    image: storyFrench,
    genre: "Bucle Temporal",
  },
  {
    title: "NY Consciousness",
    language: "English",
    level: "Avanzado",
    image: storyEnglish,
    genre: "Realidad Mental",
  },
  {
    title: "Tokyo Matrix",
    language: "日本語",
    level: "Intermedio",
    image: storyJapanese,
    genre: "Simulación Digital",
  },
];

const StoryCarousel = () => {
  const animationSimulations = [...simulations, ...simulations];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sumérgete en Nuestras <span className="text-gradient-red">Simulaciones</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada simulación es una realidad paralela diseñada para sumergirte completamente en mundos donde vives el idioma
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <div className="overflow-hidden px-2 sm:px-4 lg:px-10">
          <div className="flex w-max gap-3 sm:gap-6 animate-story-marquee marquee-track [--marquee-duration:15s] sm:[--marquee-duration:12s]">
              {animationSimulations.map((simulation, index) => (
                <Card
                  key={`${simulation.title}-${index}`}
                  className="relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02] flex-shrink-0"
                >
                  <div className="relative h-[400px] sm:h-[480px] lg:h-[560px] w-[280px] sm:w-[340px] lg:w-[420px]">
                    <img
                      src={simulation.image}
                      alt={simulation.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover-glow-red">
                          <Play className="w-8 h-8" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/80 text-primary-foreground">
                          {simulation.language}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary/80 text-secondary-foreground">
                          {simulation.level}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{simulation.title}</h3>
                      <p className="text-sm text-muted-foreground">{simulation.genre}</p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryCarousel;
