import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, TrendingUp, Users, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Section4_CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;

    if (!section || !card || !content) return;

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

      // Card entrance
      scrollTl.fromTo(
        card,
        { opacity: 0, scale: 0.82, rotateX: 10, y: '40vh' },
        { opacity: 1, scale: 1, rotateX: 0, y: 0, ease: 'power2.out' },
        0
      );

      // Content staggered entrance
      const contentElements = content.children;
      scrollTl.fromTo(
        contentElements,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.04, ease: 'power2.out' },
        0.15
      );

      // EXIT (70%-100%)
      scrollTl.fromTo(
        card,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 0, scale: 0.96, y: '-20vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-goat-black overflow-hidden z-40"
      style={{ perspective: '1000px' }}
    >
      {/* Case Study Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] lg:w-[86vw] h-[55vh] lg:h-[62vh] rounded-[14px] overflow-hidden card-shadow"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src="https://images.unsplash.com/photo-1551817958-c1b0c374133d?w=1600&q=80"
          alt="Case Study"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-goat-black/95 via-goat-black/70 to-transparent" />

        {/* Card Content */}
        <div
          ref={contentRef}
          className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-between"
        >
          {/* Label */}
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral">
            Case Study
          </span>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-heading font-bold text-3xl lg:text-5xl text-goat-white mb-3">
                750K+ Subscribers
                <br />
                <span className="text-goat-coral">in 3 Months</span>
              </h2>
              <p className="text-goat-gray text-sm lg:text-base mb-6">
                Strategy + editing for a documentary-style business. We transformed
                their content with cinematic storytelling and data-driven hooks.
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-goat-coral/20 flex items-center justify-center">
                    <Users size={16} className="text-goat-coral" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-goat-white">750K+</p>
                    <p className="text-xs text-goat-gray">Subscribers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-goat-coral/20 flex items-center justify-center">
                    <TrendingUp size={16} className="text-goat-coral" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-goat-white">3x</p>
                    <p className="text-xs text-goat-gray">Growth Rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-goat-coral/20 flex items-center justify-center">
                    <Clock size={16} className="text-goat-coral" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-goat-white">90 Days</p>
                    <p className="text-xs text-goat-gray">Timeline</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-goat-coral rounded-full text-goat-white font-medium hover:bg-goat-coral/90 transition-colors group shrink-0">
              <span>Read the case study</span>
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
