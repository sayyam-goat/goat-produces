import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Section1_Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftText = leftTextRef.current;
    const rightImage = rightImageRef.current;
    const divider = dividerRef.current;

    if (!section || !leftText || !rightImage || !divider) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on page load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Left text block entrance
      loadTl.fromTo(
        leftText.children,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.08 }
      );

      // Right image entrance
      loadTl.fromTo(
        rightImage,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1 },
        0
      );

      // Divider line entrance
      loadTl.fromTo(
        divider,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, transformOrigin: 'top' },
        0.2
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set(leftText.children, { opacity: 1, x: 0 });
            gsap.set(rightImage, { opacity: 1, x: 0 });
            gsap.set(divider, { scaleY: 1 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold the fully visible state from load
      // SETTLE (30%-70%): Static composition

      // EXIT (70%-100%)
      scrollTl.fromTo(
        leftText.children,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightImage,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        divider,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'bottom', ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-goat-black overflow-hidden z-10"
    >
      {/* Left Panel (Brand) */}
      <div className="absolute left-0 top-0 w-full lg:w-1/2 h-full bg-goat-black flex items-center">
        <div
          ref={leftTextRef}
          className="px-8 lg:px-[8vw] max-w-[34vw] lg:max-w-none"
        >
          <h1 className="font-heading font-black text-hero text-goat-white leading-[1.1] mb-6">
            GOAT
            <br />
            Produces
          </h1>
          <p className="text-base lg:text-lg text-goat-gray leading-relaxed mb-8 max-w-md">
            Video editing & content strategy for creators who want to stand out.
          </p>
          <button
            onClick={scrollToWork}
            className="inline-flex items-center gap-2 text-goat-white group"
          >
            <span className="relative">
              View selected work
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-goat-coral transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Divider Line */}
      <div
        ref={dividerRef}
        className="hidden lg:block absolute left-1/2 top-[10vh] w-px h-[80vh] bg-white/10"
      />

      {/* Right Panel (Featured Work) */}
      <div
        ref={rightImageRef}
        className="hidden lg:block absolute left-1/2 top-0 w-1/2 h-full"
      >
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80"
            alt="Featured Work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-goat-black/80 via-goat-black/20 to-transparent" />

          {/* Label */}
          <span className="absolute top-[8vh] left-[4vw] font-mono text-xs uppercase tracking-[0.08em] text-goat-coral">
            YouTube
          </span>

          {/* Headline */}
          <h2 className="absolute top-[12vh] left-[4vw] font-heading font-bold text-2xl lg:text-3xl text-goat-white max-w-[40vw]">
            Long-Form Storytelling
          </h2>
        </div>
      </div>

      {/* Mobile Featured Work */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-[45vh]">
        <img
          src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"
          alt="Featured Work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-goat-black via-goat-black/50 to-transparent" />
        <span className="absolute top-4 left-6 font-mono text-xs uppercase tracking-[0.08em] text-goat-coral">
          YouTube
        </span>
        <h2 className="absolute top-10 left-6 font-heading font-bold text-xl text-goat-white">
          Long-Form Storytelling
        </h2>
      </div>
    </section>
  );
}
