import { Brain, MessageCircle, Sparkles, Trophy } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Historias Cinematográficas",
    description: "Aprende con historias diseñadas como series de Netflix. Cada capítulo te engancha más que el anterior.",
  },
  {
    icon: Brain,
    title: "IA Personalizada",
    description: "Nuestra IA adapta el contenido a tu nivel y estilo de aprendizaje para maximizar tu progreso.",
  },
  {
    icon: Sparkles,
    title: "Aprendizaje Natural",
    description: "Olvida la gramática aburrida. Aprende como lo hiciste con tu primer idioma: conversando.",
  },
  {
    icon: Trophy,
    title: "Resultados Comprobados",
    description: "95% de nuestros usuarios alcanzan fluidez conversacional en menos de 6 meses.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por qué <span className="brand-font text-gradient-cyan">Sap Sap</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La combinación perfecta entre entretenimiento y aprendizaje efectivo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 hover:scale-105 transition-all duration-300 hover-glow-cyan group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
