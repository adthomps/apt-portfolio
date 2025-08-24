import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { PhotographySection } from "@/components/PhotographySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CodingSection } from "@/components/CodingSection";
import { TestingSection } from "@/components/TestingSection";
import { BlogSection } from "@/components/blogs/BlogSection";
import { Footer } from "@/components/Footer";
import SEO from "@/components/shared/SEO";
const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="APT Portfolio"
        description="Engineering portfolio with projects, photography, testing, and technical blogs/podcasts."
        og={{ type: "website", image: "/profile.jpg", siteName: "APT Portfolio" }}
        twitter={{ card: "summary_large_image" }}
      />
      <Navigation />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <PhotographySection />
        <section id="projects" className="min-h-screen py-20 bg-section-gradient">
          <div className="container mx-auto px-6">
            <ProjectsSection />
          </div>
        </section>
        <section id="coding" className="min-h-screen py-20 bg-section-gradient">
          <div className="container mx-auto px-6">
            <CodingSection />
          </div>
        </section>
        <section id="testing" className="min-h-screen py-20 bg-section-gradient">
          <div className="container mx-auto px-6">
            <TestingSection />
          </div>
        </section>
        <section id="blog" className="min-h-screen py-20 bg-section-gradient">
          <div className="container mx-auto px-6">
            <BlogSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Index;