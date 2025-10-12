import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGeoLocation } from '@/hooks/useGeoLocation';

export type Language = 'es' | 'en' | 'fr' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Hero Section
    'hero.title': 'Aprende idiomas viviendo historias inmersivas',
    'hero.subtitle': 'Sumérgete en mundos virtuales donde cada conversación te acerca a la fluidez. Practica idiomas de forma natural a través de simulaciones interactivas.',
    'hero.cta': 'Comenzar Aventura',
    'hero.waitlist': 'Únete a la Lista de Espera',
    
    // Story Carousel
    'stories.title': 'Sumérgete en Nuestras',
    'stories.title.highlight': 'Simulaciones',
    'stories.subtitle': 'Cada simulación es una realidad paralela diseñada para sumergirte completamente en mundos donde vives el idioma',
    
    // Creator Section
    'creator.badge': 'Para Creadores de Contenido',
    'creator.title': 'Comparte tu experiencia y transformala en',
    'creator.title.highlight': 'historias',
    'creator.subtitle': 'Deja que tus experiencias se conviertan en historias que conecten con audiencias globales y fortalezcan tu marca personal.',
    'creator.cta': 'Conviértete en Creador',
    
    // Features
    'features.title': 'Todo lo que necesitas para dominar idiomas',
    'features.subtitle': 'La combinación perfecta entre entretenimiento y aprendizaje efectivo',
    'features.why': '¿Por qué',
    'feature1.title': 'Historias Cinematográficas',
    'feature1.desc': 'Aprende con historias diseñadas como series de Netflix. Cada capítulo te engancha más que el anterior.',
    'feature2.title': 'IA Personalizada', 
    'feature2.desc': 'Nuestra IA adapta el contenido a tu nivel y estilo de aprendizaje para maximizar tu progreso.',
    'feature3.title': 'Aprendizaje Natural',
    'feature3.desc': 'Olvida la gramática aburrida. Aprende como lo hiciste con tu primer idioma: conversando.',
    'feature4.title': 'Resultados Comprobados',
    'feature4.desc': '95% de nuestros usuarios alcanzan fluidez conversacional en menos de 6 meses.',
    
    // Footer
    'footer.description': 'Aprende idiomas de forma adictiva y efectiva',
    'footer.product': 'Producto',
    'footer.company': 'Compañía',
    'footer.support': 'Soporte',
    'footer.stories': 'Historias',
    'footer.languages': 'Idiomas',
    'footer.pricing': 'Precios',
    'footer.apps': 'Apps',
    'footer.about': 'Sobre Nosotros',
    'footer.creators': 'Creadores',
    'footer.careers': 'Carreras',
    'footer.press': 'Prensa',
    'footer.help': 'Centro de Ayuda',
    'footer.community': 'Comunidad',
    'footer.blog': 'Blog',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.cookies': 'Cookies',
    
    // Benefits
    'benefit.global': 'Alcance global con contenido educativo',
    'benefit.monetize': 'Monetiza tu conocimiento de idiomas', 
    'benefit.ai': 'Herramientas de IA para crear historias',
    'benefit.community': 'Comunidad de millones de estudiantes',
  },
  en: {
    // Hero Section
    'hero.title': 'Learn languages by living immersive stories',
    'hero.subtitle': 'Dive into virtual worlds where every conversation brings you closer to fluency. Practice languages naturally through interactive simulations.',
    'hero.cta': 'Start Adventure',
    'hero.waitlist': 'Join Waitlist',
    
    // Story Carousel
    'stories.title': 'Dive into Our',
    'stories.title.highlight': 'Simulations',
    'stories.subtitle': 'Each simulation is a parallel reality designed to completely immerse you in worlds where you live the language',
    
    // Creator Section
    'creator.badge': 'For Content Creators',
    'creator.title': 'Share your experience and transform it into',
    'creator.title.highlight': 'stories',
    'creator.subtitle': 'Let your experiences become stories that connect with global audiences and strengthen your personal brand.',
    'creator.cta': 'Become a Creator',
    
    // Features
    'features.title': 'Everything you need to master languages',
    'features.subtitle': 'The perfect combination of entertainment and effective learning',
    'features.why': 'Why',
    'feature1.title': 'Cinematic Stories',
    'feature1.desc': 'Learn with stories designed like Netflix series. Each chapter hooks you more than the last.',
    'feature2.title': 'Personalized AI',
    'feature2.desc': 'Our AI adapts content to your level and learning style to maximize your progress.',
    'feature3.title': 'Natural Learning',
    'feature3.desc': 'Forget boring grammar. Learn like you did with your first language: by conversing.',
    'feature4.title': 'Proven Results',
    'feature4.desc': '95% of our users reach conversational fluency in less than 6 months.',
    
    // Footer
    'footer.description': 'Learn languages in an addictive and effective way',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.stories': 'Stories',
    'footer.languages': 'Languages',
    'footer.pricing': 'Pricing',
    'footer.apps': 'Apps',
    'footer.about': 'About Us',
    'footer.creators': 'Creators',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.help': 'Help Center',
    'footer.community': 'Community',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookies',
    
    // Benefits
    'benefit.global': 'Global reach with educational content',
    'benefit.monetize': 'Monetize your language knowledge',
    'benefit.ai': 'AI tools to create stories',
    'benefit.community': 'Community of millions of students',
  },
  fr: {
    // Hero Section
    'hero.title': 'Apprenez les langues en vivant des histoires immersives',
    'hero.subtitle': 'Plongez dans des mondes virtuels où chaque conversation vous rapproche de la maîtrise. Pratiquez les langues naturellement grâce à des simulations interactives.',
    'hero.cta': 'Commencer l\'Aventure',
    'hero.waitlist': 'Rejoindre la Liste d\'Attente',
    
    // Story Carousel
    'stories.title': 'Plongez dans Nos',
    'stories.title.highlight': 'Simulations',
    'stories.subtitle': 'Chaque simulation est une réalité parallèle conçue pour vous immerger complètement dans des mondes où vous vivez la langue',
    
    // Creator Section
    'creator.badge': 'Pour les Créateurs de Contenu',
    'creator.title': 'Partagez votre expérience et transformez-la en',
    'creator.title.highlight': 'histoires',
    'creator.subtitle': 'Laissez vos expériences devenir des histoires qui se connectent avec des audiences mondiales et renforcent votre marque personnelle.',
    'creator.cta': 'Devenir Créateur',
    
    // Features
    'features.title': 'Tout ce dont vous avez besoin pour maîtriser les langues',
    'features.subtitle': 'La combinaison parfaite entre divertissement et apprentissage efficace',
    'features.why': 'Pourquoi',
    'feature1.title': 'Histoires Cinématographiques',
    'feature1.desc': 'Apprenez avec des histoires conçues comme des séries Netflix. Chaque chapitre vous accroche plus que le précédent.',
    'feature2.title': 'IA Personnalisée',
    'feature2.desc': 'Notre IA adapte le contenu à votre niveau et style d\'apprentissage pour maximiser vos progrès.',
    'feature3.title': 'Apprentissage Naturel',
    'feature3.desc': 'Oubliez la grammaire ennuyeuse. Apprenez comme vous l\'avez fait avec votre première langue: en conversant.',
    'feature4.title': 'Résultats Prouvés',
    'feature4.desc': '95% de nos utilisateurs atteignent la fluidité conversationnelle en moins de 6 mois.',
    
    // Footer
    'footer.description': 'Apprenez les langues de manière addictive et efficace',
    'footer.product': 'Produit',
    'footer.company': 'Entreprise',
    'footer.support': 'Support',
    'footer.stories': 'Histoires',
    'footer.languages': 'Langues',
    'footer.pricing': 'Tarifs',
    'footer.apps': 'Apps',
    'footer.about': 'À Propos',
    'footer.creators': 'Créateurs',
    'footer.careers': 'Carrières',
    'footer.press': 'Presse',
    'footer.help': 'Centre d\'Aide',
    'footer.community': 'Communauté',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.cookies': 'Cookies',
    
    // Benefits
    'benefit.global': 'Portée mondiale avec du contenu éducatif',
    'benefit.monetize': 'Monétisez vos connaissances linguistiques',
    'benefit.ai': 'Outils IA pour créer des histoires',
    'benefit.community': 'Communauté de millions d\'étudiants',
  },
  pt: {
    // Hero Section
    'hero.title': 'Aprenda idiomas vivendo histórias imersivas',
    'hero.subtitle': 'Mergulhe em mundos virtuais onde cada conversa te aproxima da fluência. Pratique idiomas naturalmente através de simulações interativas.',
    'hero.cta': 'Começar Aventura',
    'hero.waitlist': 'Entrar na Lista de Espera',
    
    // Story Carousel
    'stories.title': 'Mergulhe em Nossas',
    'stories.title.highlight': 'Simulações',
    'stories.subtitle': 'Cada simulação é uma realidade paralela projetada para te imergir completamente em mundos onde você vive o idioma',
    
    // Creator Section
    'creator.badge': 'Para Criadores de Conteúdo',
    'creator.title': 'Compartilhe sua experiência e transforme-a em',
    'creator.title.highlight': 'histórias',
    'creator.subtitle': 'Deixe suas experiências se tornarem histórias que se conectam com audiências globais e fortalecem sua marca pessoal.',
    'creator.cta': 'Tornar-se Criador',
    
    // Features
    'features.title': 'Tudo que você precisa para dominar idiomas',
    'features.subtitle': 'A combinação perfeita entre entretenimento e aprendizado eficaz',
    'features.why': 'Por que',
    'feature1.title': 'Histórias Cinematográficas',
    'feature1.desc': 'Aprenda com histórias projetadas como séries da Netflix. Cada capítulo te prende mais que o anterior.',
    'feature2.title': 'IA Personalizada',
    'feature2.desc': 'Nossa IA adapta o conteúdo ao seu nível e estilo de aprendizado para maximizar seu progresso.',
    'feature3.title': 'Aprendizado Natural',
    'feature3.desc': 'Esqueça a gramática chata. Aprenda como fez com seu primeiro idioma: conversando.',
    'feature4.title': 'Resultados Comprovados',
    'feature4.desc': '95% dos nossos usuários alcançam fluência conversacional em menos de 6 meses.',
    
    // Footer
    'footer.description': 'Aprenda idiomas de forma viciante e eficaz',
    'footer.product': 'Produto',
    'footer.company': 'Empresa',
    'footer.support': 'Suporte',
    'footer.stories': 'Histórias',
    'footer.languages': 'Idiomas',
    'footer.pricing': 'Preços',
    'footer.apps': 'Apps',
    'footer.about': 'Sobre Nós',
    'footer.creators': 'Criadores',
    'footer.careers': 'Carreiras',
    'footer.press': 'Imprensa',
    'footer.help': 'Central de Ajuda',
    'footer.community': 'Comunidade',
    'footer.blog': 'Blog',
    'footer.contact': 'Contato',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos',
    'footer.cookies': 'Cookies',
    
    // Benefits
    'benefit.global': 'Alcance global com conteúdo educativo',
    'benefit.monetize': 'Monetize seu conhecimento de idiomas',
    'benefit.ai': 'Ferramentas de IA para criar histórias', 
    'benefit.community': 'Comunidade de milhões de estudantes',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const geoLocation = useGeoLocation();

  // Auto-detect language based on geolocation when available
  useEffect(() => {
    if (!geoLocation.loading && !isAutoDetected && geoLocation.language) {
      setLanguage(geoLocation.language);
      setIsAutoDetected(true);
      console.log(`Auto-detected language: ${geoLocation.language} for country: ${geoLocation.country}`);
    }
  }, [geoLocation.loading, geoLocation.language, isAutoDetected]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};