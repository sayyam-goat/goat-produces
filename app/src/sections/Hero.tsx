import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const orb = orbRef.current;
    const content = contentRef.current;

    if (!section || !orb || !content) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Orb entrance
      loadTl.fromTo(
        orb,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      );

      // Content entrance
      loadTl.fromTo(
        content.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        0.3
      );

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
        },
      });

      // SETTLE (0%-70%): Gentle orb pulse
      // EXIT (70%-100%)
      scrollTl.fromTo(
        content,
        { y: 0, opacity: 1 },
        { y: -100, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        orb,
        { scale: 1, opacity: 1 },
        { scale: 1.5, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate random particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-goat-black overflow-hidden z-10"
    >
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: 0.2,
              animation: `particle-float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Purple Orb */}
      <div
        ref={orbRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px]"
      >
        {/* Outer glow - deep dark purple base */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-goat-purple-dark/60 via-goat-purple/20 to-transparent blur-3xl animate-orb-pulse" />
        {/* Middle glow */}
        <div className="absolute inset-8 rounded-full bg-gradient-radial from-goat-purple-dark/70 via-goat-purple/40 to-transparent blur-2xl animate-orb-pulse" style={{ animationDelay: '0.5s' }} />
        {/* Inner core */}
        <div className="absolute inset-16 rounded-full bg-gradient-radial from-goat-purple/80 via-goat-purple-dark/50 to-transparent blur-xl animate-orb-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-goat-purple/20 border border-goat-purple/30 rounded-full">
          <span className="w-2 h-2 bg-goat-purple rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-goat-purple-light">
            Premium Video Editing
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-bold text-hero text-white leading-[1.1] mb-6 max-w-4xl">
          Elevate Your
          <br />
          <span className="text-gradient-purple">Content</span>
        </h1>

        {/* Subheadline */}
        <p className="text-goat-gray text-lg lg:text-xl max-w-2xl mb-10">
          Premium video editing for creators who demand excellence.
          <br className="hidden lg:block" />
          Short-form and long-form content that converts.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollToSection('pricing')}
            className="group flex items-center gap-2 px-8 py-4 bg-goat-purple hover:bg-goat-purple-light text-white font-medium rounded-full transition-all duration-300 hover:shadow-glow-lg"
          >
            <span>Get Started</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToSection('work')}
            className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-goat-purple/50 hover:border-goat-purple text-white font-medium rounded-full transition-all duration-300"
          >
            <Play size={18} className="text-goat-purple" />
            <span>View Our Work</span>
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-goat-black to-transparent pointer-events-none" />
    </section>
  );
}
