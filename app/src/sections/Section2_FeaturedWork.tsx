import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Section2_FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgText = bgTextRef.current;
    const card = cardRef.current;
    const cardContent = cardContentRef.current;

    if (!section || !bgText || !card || !cardContent) return;

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

      // Background "BEST WORK" text
      scrollTl.fromTo(
        bgText,
        { opacity: 0, scale: 1.12, y: '6vh' },
        { opacity: 0.12, scale: 1, y: 0, ease: 'power2.out' },
        0
      );

      // Hero Work Card entrance
      scrollTl.fromTo(
        card,
        { opacity: 0, y: '60vh', scale: 0.92, rotateX: 8 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, ease: 'power2.out' },
        0
      );

      // Card content staggered entrance
      const cardElements = cardContent.children;
      scrollTl.fromTo(
        cardElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, ease: 'power2.out' },
        0.15
      );

      // SETTLE (30%-70%): Hold position

      // EXIT (70%-100%)
      scrollTl.fromTo(
        bgText,
        { opacity: 0.12, scale: 1, y: 0 },
        { opacity: 0, scale: 0.96, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        card,
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: '-40vh', scale: 0.95, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full h-screen bg-goat-black overflow-hidden z-20"
      style={{ perspective: '1000px' }}
    >
      {/* Background "BEST WORK" text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-heading font-black text-bg-text text-goat-white opacity-[0.12] whitespace-nowrap">
          BEST WORK
        </span>
      </div>

      {/* Hero Work Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] lg:w-[74vw] h-[50vh] lg:h-[56vh] rounded-[14px] overflow-hidden card-shadow"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80"
          alt="Cinematic Documentary Edits"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-goat-black/90 via-goat-black/30 to-transparent" />

        {/* Card Content */}
        <div
          ref={cardContentRef}
          className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-between"
        >
          {/* Label */}
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral">
            YouTube
          </span>

          {/* Bottom Content */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-2xl lg:text-4xl text-goat-white mb-2 max-w-[44vw]">
                Cinematic Documentary Edits
              </h2>
              <p className="text-goat-gray text-sm lg:text-base max-w-md">
                High-retention storytelling with smooth transitions and color grading.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-goat-white group shrink-0">
              <span className="relative text-sm">
                Open project
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-goat-coral" />
              </span>
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
