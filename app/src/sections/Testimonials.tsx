import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const videoTestimonials = [
  {
    id: '4MA_qdAearo',
    title: 'Client Success Story',
    label: 'Testimonial',
    thumbnail: 'https://img.youtube.com/vi/4MA_qdAearo/maxresdefault.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/4MA_qdAearo/hqdefault.jpg',
    url: 'https://youtu.be/4MA_qdAearo',
  },
  {
    id: 'KLlqDlfz0WU',
    title: 'Real Results, Real Growth',
    label: 'Testimonial',
    thumbnail: 'https://img.youtube.com/vi/KLlqDlfz0WU/maxresdefault.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/KLlqDlfz0WU/hqdefault.jpg',
    url: 'https://youtu.be/KLlqDlfz0WU',
  },
  {
    id: 'jYtCDIcMcI8',
    title: 'Why Clients Choose Us',
    label: 'Testimonial',
    thumbnail: 'https://img.youtube.com/vi/jYtCDIcMcI8/maxresdefault.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/jYtCDIcMcI8/hqdefault.jpg',
    url: 'https://youtu.be/jYtCDIcMcI8',
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [failedThumbs, setFailedThumbs] = useState<Set<number>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

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

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleImgError = (index: number) => {
    setFailedThumbs((prev) => new Set(prev).add(index));
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full py-24 lg:py-32 bg-goat-black z-40"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-goat-purple mb-4 block">
            Testimonials
          </span>
          <h2 className="font-bold text-section text-white mb-4">
            What Clients <span className="text-gradient-purple">Say</span>
          </h2>
          <p className="text-goat-gray text-lg max-w-2xl mx-auto">
            Don't just take our word for it — watch what our clients have to say
          </p>
        </div>

        {/* Video Stack */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {videoTestimonials.map((video, index) => (
            <div
              key={video.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`group relative aspect-video w-full rounded-2xl overflow-hidden glow-border cursor-pointer transition-transform duration-500 ${
                hoveredIndex === index ? 'scale-[1.01]' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => window.open(video.url, '_blank', 'noopener,noreferrer')}
            >
              {/* Thumbnail */}
              <img
                src={failedThumbs.has(index) ? video.fallbackThumbnail : video.thumbnail}
                alt={video.title}
                onError={() => handleImgError(index)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-goat-black/90 via-goat-black/30 to-transparent pointer-events-none" />

              {/* Hover tint */}
              <div
                className={`absolute inset-0 bg-goat-purple/10 transition-opacity duration-400 pointer-events-none ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Play button */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                }`}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-goat-purple/80 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-goat-purple/30 transition-all duration-300 group-hover:bg-goat-purple group-hover:shadow-goat-purple/50">
                  <Play size={28} className="text-white fill-white ml-1" />
                </div>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-goat-purple/20 border border-goat-purple/30 rounded-full text-xs font-mono text-goat-purple-light">
                    {video.label}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-goat-purple-light transition-colors duration-300">
                  {video.title}
                </h3>
              </div>

              {/* Top-right external link badge */}
              <div
                className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-goat-purple/80 backdrop-blur-sm rounded-full text-xs font-medium text-white transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                <ExternalLink size={12} />
                Watch on YouTube
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
