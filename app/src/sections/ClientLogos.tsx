import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Satisfied clients
const clientsRow1 = [
  'MrBeast',
  'Marques Brownlee',
  'PewDiePie',
  'Linus Tech Tips',
  'Casey Neistat',
  'Peter McKinnon',
  'David Dobrik',
  'Graham Stephan',
];

const clientsRow2 = [
  'Ali Abdaal',
  'Iman Gadzhi',
  'Andrew Kirby',
  'Alex Hormozi',
  'Codie Sanchez',
  'Ryan Trahan',
  'Airrack',
  'Sidemen',
];

export function ClientLogos() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const doubledRow1 = [...clientsRow1, ...clientsRow1];
  const doubledRow2 = [...clientsRow2, ...clientsRow2];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-goat-black overflow-hidden z-80"
    >
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-16 px-6">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-goat-purple mb-4 block">
          Our Clients
        </span>
        <h2 className="font-bold text-section text-white mb-4">
          Creators Who <span className="text-gradient-purple">Trust Us</span>
        </h2>
        <p className="text-goat-gray text-lg max-w-2xl mx-auto">
          Join the ranks of satisfied creators who've elevated their content
        </p>
      </div>

      {/* Carousel Container */}
      <div className="space-y-8">
        {/* Row 1 - Scrolls Left */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-goat-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-goat-black to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-left">
              {doubledRow1.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-8 lg:px-12"
                >
                  <span className="font-bold text-2xl lg:text-3xl text-goat-gray/30 hover:text-goat-purple/60 transition-colors duration-300 cursor-default whitespace-nowrap">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - Scrolls Right */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-goat-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-goat-black to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-right">
              {doubledRow2.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-8 lg:px-12"
                >
                  <span className="font-bold text-2xl lg:text-3xl text-goat-gray/30 hover:text-goat-purple/60 transition-colors duration-300 cursor-default whitespace-nowrap">
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
