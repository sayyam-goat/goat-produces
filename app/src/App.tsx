import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { LogoCarousel } from './sections/LogoCarousel';
import { Services } from './sections/Services';
import { VideoShowcase } from './sections/VideoShowcase';
import { ShortFormPricing } from './sections/ShortFormPricing';
import { LongFormPricing } from './sections/LongFormPricing';
import { Process } from './sections/Process';
import { ClientLogos } from './sections/ClientLogos';
import { Testimonials } from './sections/Testimonials';
import { Stats } from './sections/Stats';
import { FAQ } from './sections/FAQ';
import { CTA } from './sections/CTA';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-goat-black min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <LogoCarousel />
        <Services />
        <VideoShowcase />
        <ShortFormPricing />
        <LongFormPricing />
        <Process />
        <ClientLogos />
        <Testimonials />
        <Stats />
        <FAQ />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
