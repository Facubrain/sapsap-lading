import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StoryCarousel from "@/components/StoryCarousel";
import CreatorSection from "@/components/CreatorSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <StoryCarousel />
      <Features />
      <CreatorSection />
      <Footer />
    </div>
  );
};

export default Index;
