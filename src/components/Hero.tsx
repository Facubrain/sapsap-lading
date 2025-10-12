import { Button } from "@/components/ui/button";
import { Apple, Pause, Play, Volume2, VolumeX } from "lucide-react";
import heroVideoDesktop from "@/assets/video/jelous-sapsap-desktop.mp4";
import heroVideoMobile from "@/assets/video/jelous-sapsap-mobile.mp4";
import heroPoster from "@/assets/video/jelous-sapsap-poster.jpg";
import WaitlistForm from "@/components/WaitlistForm";
import LanguageSwitch from "@/components/LanguageSwitch";
import Logo from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVideoLazyLoad } from "@/hooks/useVideoLazyLoad";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useEffect, useState } from "react";

const Hero = () => {
  const { language, setLanguage, t } = useLanguage();
  const { videoRef, shouldLoadVideo } = useVideoLazyLoad({ threshold: 0.1 });
  const deviceType = useDeviceType();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  
  // Select appropriate video source based on device
  const videoSrc = deviceType === 'mobile' ? heroVideoMobile : heroVideoDesktop;

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
      {/* Language Switch in top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitch 
          currentLanguage={language} 
          onLanguageChange={(lang) => setLanguage(lang as any)} 
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="mb-12 flex items-center justify-center lg:justify-start gap-6">
              <div className="relative group">
                <Logo width={220} height={70} className="drop-shadow-xl hover:scale-105 transition-transform duration-300" />
                
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-lg blur-2xl opacity-60 -z-10 scale-110"></div>
              </div>
              
              <div className="text-4xl md:text-5xl font-bold brand-font">
                <span className="text-gradient-red">Sap</span><span className="text-gradient-cyan">Sap</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              {t('hero.subtitle')}
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

            <div className="mt-10 max-w-xl">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold leading-relaxed">
                    Reserva tu lugar en la lista de prelanzamiento para <span className="text-gradient-cyan">beneficios exclusivos</span>.
                  </h3>
                </div>
                <WaitlistForm />
              </div>
            </div>

          </div>

          <div className="relative h-full min-h-[320px] flex items-center justify-center">
            <div className="relative w-full max-w-[520px] aspect-[9/16] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(229,9,20,0.35)]">
              <video
                ref={videoRef}
                poster={heroPoster}
                autoPlay={shouldLoadVideo}
                loop
                muted={isMuted}
                playsInline
                preload="none"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={() => {
                  const video = videoRef.current;
                  if (video) {
                    setIsMuted(video.muted);
                  }
                }}
                className="h-full w-full object-cover"
              >
                {shouldLoadVideo && (
                  <source src={videoSrc} type="video/mp4" />
                )}
              </video>
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
