import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  {
    label: 'YOUTUBE',
    title: 'Short-Form Hooks',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80',
  },
  {
    label: 'YOUTUBE',
    title: 'Retention-First Edits',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
  },
  {
    label: 'REELS',
    title: 'Trend-Aware Content',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  },
];

export function Section3_WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Left Card
      scrollTl.fromTo(
        cards[0],
        { opacity: 0, x: '-60vw', rotateY: -18 },
        { opacity: 1, x: 0, rotateY: 0, ease: 'power2.out' },
        0
      );

      // Center Card
      scrollTl.fromTo(
        cards[1],
        { opacity: 0, y: '60vh', scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out' },
        0.05
      );

      // Right Card
      scrollTl.fromTo(
        cards[2],
        { opacity: 0, x: '60vw', rotateY: 18 },
        { opacity: 1, x: 0, rotateY: 0, ease: 'power2.out' },
        0.1
      );

      // EXIT (70%-100%)
      scrollTl.fromTo(
        cards[0],
        { opacity: 1, x: 0 },
        { opacity: 0, x: '-30vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cards[1],
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: '-30vh', scale: 0.95, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cards[2],
        { opacity: 1, x: 0 },
        { opacity: 0, x: '30vw', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-goat-black overflow-hidden z-30"
      style={{ perspective: '1000px' }}
    >
      {/* Cards Container */}
      <div className="absolute inset-0 flex items-center justify-center px-4 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[2vw] w-full max-w-7xl">
          {workItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative w-full lg:w-[26vw] h-[30vh] lg:h-[72vh] rounded-[12px] overflow-hidden card-shadow group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-goat-black/90 via-goat-black/20 to-transparent" />

              {/* Card Content */}
              <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-between">
                {/* Label */}
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral">
                  {item.label}
                </span>

                {/* Bottom Content */}
                <div className="flex items-end justify-between">
                  <h3 className="font-heading font-bold text-lg lg:text-xl text-goat-white">
                    {item.title}
                  </h3>
                  <ArrowUpRight
                    size={20}
                    className="text-goat-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
