import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const formatItems = [
  {
    label: 'YOUTUBE',
    title: 'Long-Form That Holds Attention',
    description: 'Cinematic edits with smooth transitions, color grading, and engaging narratives.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  },
  {
    label: 'REELS',
    title: 'Short-Form With Speed',
    description: 'High-retention hooks, trend-aware editing, and viral-style cuts.',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
  },
];

export function Section5_ContentFormats() {
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
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Left Card entrance
      scrollTl.fromTo(
        cards[0],
        { opacity: 0, x: '-60vw' },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0
      );

      // Right Card entrance
      scrollTl.fromTo(
        cards[1],
        { opacity: 0, x: '60vw' },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0.05
      );

      // EXIT (70%-100%)
      scrollTl.fromTo(
        cards[0],
        { opacity: 1, x: 0 },
        { opacity: 0, x: '-20vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cards[1],
        { opacity: 1, x: 0 },
        { opacity: 0, x: '20vw', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-goat-black overflow-hidden z-50"
    >
      {/* Cards Container */}
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center px-4 lg:px-[6vw] gap-4 lg:gap-[4vw]">
        {formatItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="relative w-full lg:w-[42vw] h-[35vh] lg:h-[72vh] rounded-[12px] overflow-hidden card-shadow group cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-goat-black/90 via-goat-black/30 to-transparent" />

            {/* Card Content */}
            <div className="absolute inset-0 p-5 lg:p-8 flex flex-col justify-between">
              {/* Label */}
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral">
                {item.label}
              </span>

              {/* Bottom Content */}
              <div>
                <h3 className="font-heading font-bold text-xl lg:text-2xl text-goat-white mb-2">
                  {item.title}
                </h3>
                <p className="text-goat-gray text-sm mb-4 max-w-sm">
                  {item.description}
                </p>
                <button className="inline-flex items-center gap-2 text-goat-white group/btn">
                  <span className="relative text-sm">
                    Watch
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-goat-coral transition-all duration-300 group-hover/btn:w-full" />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
