import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import coverGenteToxica from "@/assets/covers/gente-toxica.jpeg";
import coverMiVerano from "@/assets/covers/mi-verano-mis-reglas.png";
import coverRioDeJaneiro from "@/assets/covers/rio-de-janeiro-otra-vez.jpeg";
import coverVanPorLasVegas from "@/assets/covers/van-por-las-vegas.jpeg";
import coverAtlantaAdventure from "@/assets/covers/Atlanta adventure.jpeg";
import coverAwakingCordoba from "@/assets/covers/awakingcordoba.jpg";
import coverAmericanInterpreter from "@/assets/covers/American court interpreter who came to Rio for grad school 3 years ago and stayed. Has been certified for 18 months, works downtown near Tribunal. Takes the work seriously and is building a reputation in the legal community..jpeg";
import coverFormerStreetDog from "@/assets/covers/Former street dog adopted 1 year ago by a marathon runner. First real home. Deeply loyal and terrified of losing this safe place..jpeg";
import coverCordobaGuitarist from "@/assets/covers/Late 20s guitarista  from Córdoba, Argentina. the band broke up badly (he slept with bassist's girlfriend). Came to Rio to 'reset' and find himself. Told family he's 'exploring music opportunities' but is really running away. Has R$4,000 left, ..jpeg";
import coverWisconsinWoman from "@/assets/covers/Mid-20s woman from Wisconsin who quit her car showroom job after a panic attack. Saved for 6 months and told family it's 'just a vacation' but is secretly terrified she's unemployable. Has $3,400 left in savings with no backup plan..jpeg";
import coverJuanCordoba from "@/assets/covers/Juan is a 35-year-old electronics technician living with his wife Elena and daughter Martina in Córdoba's General Paz neighborhood. He enjoys Saturday nights playing cards with friends..jpeg";
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
    description: "Navega relaciones complicadas y aprende a identificar comportamientos tóxicos mientras dominas conversaciones en español."
  },
  {
    title: "Verano Infinito",
    language: "Español",
    level: "Intermedio",
    image: coverMiVerano,
    genre: "Realidad Alternativa",
    description: "Vive un verano que nunca termina donde cada día trae nuevas aventuras y diálogos únicos en español."
  },
  {
    title: "Rio Paralelo",
    language: "Português",
    level: "Intermedio",
    image: coverRioDeJaneiro,
    genre: "Mundo Espejo",
    description: "Explora una versión alternativa de Rio de Janeiro llena de misterios y conversaciones en portugués brasileño."
  },
  {
    title: "Vegas Dimension",
    language: "English",
    level: "Intermedio",
    image: coverVanPorLasVegas,
    genre: "Realidad Distorsionada",
    description: "Experience Las Vegas like never before in this twisted reality where English conversations unlock hidden secrets."
  },
  {
    title: "Atlanta Nexus",
    language: "English",
    level: "Intermedio",
    image: coverAtlantaAdventure,
    genre: "Portal Urbano",
    description: "Discover portals throughout Atlanta that transport you to different scenarios for practicing real English conversations."
  },
  {
    title: "Córdoba Cuántica",
    language: "Español",
    level: "Intermedio",
    image: coverAwakingCordoba,
    genre: "Realidad Fragmentada",
    description: "En esta Córdoba cuántica, cada decisión crea nuevas realidades donde perfeccionas tu español argentino."
  },
  {
    title: "Rio Legal Protocol",
    language: "Português",
    level: "Avanzado",
    image: coverAmericanInterpreter,
    genre: "Drama Jurídico",
    description: "Navigate the complex world of Brazilian legal proceedings as a certified court interpreter building your professional reputation in downtown Rio's legal district."
  },
  {
    title: "Lealdade Canina",
    language: "Português",
    level: "Principiante",
    image: coverFormerStreetDog,
    genre: "Drama Emocional",
    description: "Experience the profound loyalty and fears of a former street dog who found their forever home with a marathon runner in Rio."
  },
  {
    title: "Escape de Córdoba",
    language: "Español",
    level: "Intermedio",
    image: coverCordobaGuitarist,
    genre: "Drama Musical",
    description: "Follow a young guitarist from Córdoba who fled to Rio after his band's dramatic breakup, trying to rebuild his life while his savings dwindle."
  },
  {
    title: "Pánico en el Paraíso",
    language: "English",
    level: "Intermedio", 
    image: coverWisconsinWoman,
    genre: "Thriller Psicológico",
    description: "Experience the hidden anxiety of a Wisconsin woman on what appears to be a vacation but is actually her escape from a career crisis and uncertain future."
  },
  {
    title: "Noches de Barrio",
    language: "Español",
    level: "Intermedio",
    image: coverJuanCordoba,
    genre: "Drama Familiar",
    description: "Join Juan, a 35-year-old electronics technician from General Paz neighborhood in Córdoba, as he navigates family life with wife Elena and daughter Martina while enjoying Saturday card games with friends."
  },
  {
    title: "Madrid Multiverso",
    language: "Español",
    level: "Intermedio",
    image: storySpanish,
    genre: "Simulación Paranormal",
    description: "Explora múltiples versiones de Madrid donde eventos paranormales te enseñan español de manera única."
  },
  {
    title: "Paris Éternel",
    language: "Français",
    level: "Principiante",
    image: storyFrench,
    genre: "Bucle Temporal",
    description: "Revivez le même jour à Paris jusqu'à ce que vous maîtrisiez parfaitement les conversations en français."
  },
  {
    title: "NY Consciousness",
    language: "English",
    level: "Avanzado",
    image: storyEnglish,
    genre: "Realidad Mental",
    description: "Dive into the collective consciousness of New York City and practice advanced English through shared experiences."
  },
  {
    title: "Tokyo Matrix",
    language: "日本語",
    level: "Intermedio",
    image: storyJapanese,
    genre: "Simulación Digital",
    description: "東京のデジタル世界で日本語会話をマスターしながら、仮想現実と現実の境界を探求します。"
  },
];

const StoryCarousel = () => {
  const { t } = useLanguage();
  const animationSimulations = [...simulations, ...simulations];
  const firstRowSimulations = animationSimulations.slice(0, animationSimulations.length / 2);
  const secondRowSimulations = animationSimulations.slice(animationSimulations.length / 2);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('stories.title')} <span className="text-gradient-red">{t('stories.title.highlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('stories.subtitle')}
          </p>
        </div>
      </div>

      <div className="relative w-full space-y-8">
        {/* First Row - Slow */}
        <div className="overflow-hidden px-2 sm:px-4 lg:px-10">
          <div className="flex w-max gap-3 sm:gap-6 animate-story-marquee marquee-track [--marquee-duration:25s] sm:[--marquee-duration:20s]">
              {firstRowSimulations.map((simulation, index) => (
                <Card
                  key={`slow-${simulation.title}-${index}`}
                  className="relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02] flex-shrink-0"
                >
                  <div className="relative h-[350px] sm:h-[400px] lg:h-[450px] w-[240px] sm:w-[280px] lg:w-[320px]">
                    <img
                      src={simulation.image}
                      alt={simulation.title}
                      className="w-full h-full object-contain rounded-lg bg-gray-900"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover-glow-red mb-4">
                          <Play className="w-8 h-8" />
                        </div>
                        <p className="text-white text-sm text-center leading-tight">
                          {simulation.description}
                        </p>
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

        {/* Second Row - Fast */}
        <div className="overflow-hidden px-2 sm:px-4 lg:px-10">
          <div className="flex w-max gap-3 sm:gap-6 animate-story-marquee marquee-track [--marquee-duration:10s] sm:[--marquee-duration:8s] marquee-reverse">
              {secondRowSimulations.map((simulation, index) => (
                <Card
                  key={`fast-${simulation.title}-${index}`}
                  className="relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02] flex-shrink-0"
                >
                  <div className="relative h-[350px] sm:h-[400px] lg:h-[450px] w-[240px] sm:w-[280px] lg:w-[320px]">
                    <img
                      src={simulation.image}
                      alt={simulation.title}
                      className="w-full h-full object-contain rounded-lg bg-gray-900"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover-glow-red mb-4">
                          <Play className="w-8 h-8" />
                        </div>
                        <p className="text-white text-sm text-center leading-tight">
                          {simulation.description}
                        </p>
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
