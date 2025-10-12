import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import creatorImage from "@/assets/creator-portrait.jpg";

const CreatorSection = () => {
  const { t } = useLanguage();
  
  const benefits = [
    t('benefit.global'),
    t('benefit.monetize'),
    t('benefit.ai'),
    t('benefit.community'),
  ];
  return (
    <section className="py-24 px-4 bg-light-section text-light-section-foreground">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={creatorImage}
                alt="Content Creator"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass-effect rounded-xl p-6 backdrop-blur-xl bg-white/10">
                  <div className="grid grid-cols-3 gap-4 text-white">
                    <div>
                      <div className="text-3xl font-bold text-gradient-red">+1M</div>
                      <div className="text-sm">Estudiantes</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gradient-cyan">+100</div>
                      <div className="text-sm">Historias</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">4.9★</div>
                      <div className="text-sm">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold mb-4">
              {t('creator.badge')}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('creator.title')}{" "}
              <span className="text-gradient-red">{t('creator.title.highlight')}</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              {t('creator.subtitle')}
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-light-section-foreground text-light-section hover:bg-light-section-foreground/90 text-lg"
            >
              {t('creator.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorSection;
