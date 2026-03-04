import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Wrench, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We align on tone, goals, and the story you want to tell. Understanding your vision is our first priority.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Build',
    description: 'Edit, motion, sound, and thumbnails—polished end to end. Every detail is crafted with precision.',
    icon: Wrench,
  },
  {
    number: '03',
    title: 'Deliver',
    description: 'Fast turnaround with consistent quality and clear feedback loops. Your success is our metric.',
    icon: Rocket,
  },
];

export function Section6_StudioApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation (staggered)
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-goat-black py-20 lg:py-32 z-60"
    >
      <div className="px-6 lg:px-[8vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-20">
          <h2 className="font-heading font-bold text-section text-goat-white leading-tight max-w-3xl">
            A clear process.
            <br />
            <span className="text-goat-coral">Premium craft.</span> Fast delivery.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="relative p-6 lg:p-8 rounded-[12px] bg-goat-dark border border-white/5 group hover:border-goat-coral/30 transition-colors duration-500"
              >
                {/* Number */}
                <span className="absolute top-6 right-6 font-mono text-4xl lg:text-5xl font-bold text-goat-coral/20">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-goat-coral/10 flex items-center justify-center mb-6 group-hover:bg-goat-coral/20 transition-colors duration-500">
                  <Icon size={24} className="text-goat-coral" />
                </div>

                {/* Content */}
                <h3 className="font-heading font-bold text-xl lg:text-2xl text-goat-white mb-3">
                  {step.title}
                </h3>
                <p className="text-goat-gray text-sm lg:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
