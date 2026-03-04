import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  {
    title: 'Travel Docu-Series',
    category: 'YOUTUBE',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
  },
  {
    title: 'Product Launch Reel',
    category: 'REELS',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  },
  {
    title: 'Podcast Highlights',
    category: 'YOUTUBE',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
  },
  {
    title: 'Brand Story',
    category: 'YOUTUBE',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    title: 'Tutorial Series',
    category: 'YOUTUBE',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  },
  {
    title: 'Behind the Scenes',
    category: 'REELS',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
  },
];

export function Section9_WorkGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const items = grid.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-goat-black py-20 lg:py-32 z-90"
    >
      <div className="px-6 lg:px-[8vw]">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral mb-4 block">
            Portfolio
          </span>
          <h2 className="font-heading font-bold text-section text-goat-white">
            Recent <span className="text-goat-coral">Work</span>
          </h2>
        </div>

        {/* Work Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[16/10] rounded-[12px] overflow-hidden cursor-pointer card-shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-goat-black/90 via-goat-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral mb-2">
                  {item.category}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg text-goat-white group-hover:text-goat-coral transition-colors duration-300">
                    {item.title}
                  </h3>
                  <ExternalLink
                    size={18}
                    className="text-goat-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
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
