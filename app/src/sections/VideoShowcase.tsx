import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    title: 'Viral Reel Edit',
    category: 'Short-Form',
    thumbnail: '/src/vertical.png',
    videoUrl: '/src/vertical.mp4',
    views: '2.4M views',
    isVertical: true,
    alwaysPlay: true,
  },
  {
    title: 'Talking Heads',
    category: 'Long-Form',
    thumbnail: '/src/longform1.png',
    videoUrl: '/src/longform1.mp4',
    views: '1.8M views',
  },
  {
    title: 'Long Form',
    category: 'Long-Form',
    thumbnail: '/src/longform2.png',
    videoUrl: '/src/longform2.mp4',
    views: '890K views',
  },
];

export function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;

    if (!section || !heading || !grid) return;

    const ctx = gsap.context(() => {
      // Heading animation
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

      // Grid items animation
      const items = grid.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const video = videoRefs.current[index];
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full py-24 lg:py-32 bg-goat-black z-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-goat-purple mb-4 block">
            Portfolio
          </span>
          <h2 className="font-bold text-section text-white mb-4">
            Our Best <span className="text-gradient-purple">Work</span>
          </h2>
          <p className="text-goat-gray text-lg max-w-2xl mx-auto">
            See the quality that sets us apart. Every edit crafted for maximum engagement.
          </p>
        </div>

        {/* Video Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className={`group relative ${video.isVertical ? 'aspect-[9/16] md:aspect-auto md:row-span-2 h-full' : 'aspect-video'} rounded-2xl overflow-hidden glow-border cursor-pointer transition-transform duration-500 ${hoveredIndex === index ? 'scale-[1.02]' : 'scale-100'
                }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Video Element (plays constantly if alwaysPlay, else on hover) */}
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={video.videoUrl}
                poster={video.thumbnail}
                muted
                loop
                playsInline
                autoPlay={video.alwaysPlay}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${video.alwaysPlay || hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
              />

              {/* Thumbnail (shown when not hovering and not always playing) */}
              {!video.alwaysPlay && (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                    }`}
                />
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-goat-black/90 via-goat-black/20 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-goat-purple/20 border border-goat-purple/30 rounded-full text-xs font-mono text-goat-purple-light">
                    {video.category}
                  </span>
                  <span className="text-goat-gray text-xs">{video.views}</span>
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-goat-purple-light transition-colors duration-300">
                  {video.title}
                </h3>
              </div>

              {/* Playing indicator */}
              <div
                className={`absolute top-4 right-4 px-3 py-1.5 bg-goat-purple/80 rounded-full text-xs font-medium text-white transition-all duration-300 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
              >
                Playing
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
