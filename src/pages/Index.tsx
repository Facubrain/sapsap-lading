import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StoryCarousel from "@/components/StoryCarousel";
import CreatorPromo from "@/components/CreatorPromo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <StoryCarousel />
      <Features />
      <CreatorPromo />
      <Footer />
    </div>
  );
};

export default Index;
