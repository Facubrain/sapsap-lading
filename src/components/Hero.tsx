import { Button } from "@/components/ui/button";
import { Apple, Pause, Play, Volume2, VolumeX } from "lucide-react";
import heroVideo from "@/assets/video/jelous-sapsap.mp4";
import WaitlistForm from "@/components/WaitlistForm";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (!isMuted && video.paused) {
      void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);

    if (!video.muted && video.paused) {
      void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-r from-black via-black/80 to-black">
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Hacemos que aprender idiomas sea tan{" "}
              <span className="text-gradient-red">adictivo</span>{" "}
              como tu{" "}
              <span className="text-gradient-cyan">serie favorita</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Historias interactivas, IA personalizada y aprendizaje real.
              Domina un nuevo idioma mientras disfrutas cada capítulo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg">
                <Apple className="mr-2 h-5 w-5" />
                App Store
              </Button>
              <Button variant="cyanOutline" size="lg" className="text-lg">
                <Play className="mr-2 h-5 w-5" />
                Google Play
              </Button>
            </div>

            <div className="mt-10 max-w-xl space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold leading-relaxed">
                  Reserva tu lugar en la lista de espera de <span className="brand-font text-gradient-cyan">SAP SAP</span>.
                </h3>
                <p className="text-base text-muted-foreground">
                  Recibe invitaciones prioritarias, acceso anticipado a misiones beta y recompensas exclusivas cuando la plataforma salga a la luz.
                </p>
              </div>
              <WaitlistForm />
              <p className="text-xs text-muted-foreground">
                Prometemos solo enviar novedades relevantes y podrás salirte cuando quieras.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>+50K usuarios activos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>20+ idiomas disponibles</span>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[320px] flex items-center justify-center">
            <div className="relative w-full max-w-[520px] aspect-[9/16] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(229,9,20,0.35)]">
              <video
                src={heroVideo}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                ref={videoRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={() => {
                  const video = videoRef.current;
                  if (video) {
                    setIsMuted(video.muted);
                  }
                }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-black/60 px-5 py-3 backdrop-blur">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center gap-2 text-sm font-semibold text-white"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "Pausar" : "Reproducir"}
                </button>
                <span className="h-6 w-px bg-white/20" aria-hidden="true" />
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex items-center gap-2 text-sm font-semibold text-white"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  {isMuted ? "Activar sonido" : "Silenciar"}
                </button>
              </div>
            </div>
            <div className="absolute -right-10 top-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -left-10 bottom-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.15),transparent_50%)]" />
    </section>
  );
};

export default Hero;
