import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Client logos as text (replace with actual logos)
const clients = [
  'MrBeast',
  'PewDiePie',
  'Marques',
  'Linus',
  'Casey',
  'Peter',
  'David',
  'Graham',
  'Ali',
  'Iman',
  'Andrew',
  'Hormozi',
];

export function LogoCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Double the clients array for seamless loop
  const doubledClients = [...clients, ...clients];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-20 bg-goat-black overflow-hidden z-20"
    >
      <div ref={contentRef} className="px-6 lg:px-12">
        {/* Label */}
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-goat-gray text-center mb-10">
          Trusted by Top Creators
        </p>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-goat-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-goat-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling logos */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-left">
              {doubledClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-8 lg:px-12"
                >
                  <span className="font-bold text-xl lg:text-2xl text-goat-gray/40 hover:text-goat-purple/60 transition-colors duration-300 cursor-default whitespace-nowrap">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
