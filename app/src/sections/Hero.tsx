import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const drawSmoke = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // To make realistic folding smoke without tanking performance,
    // we use a single-pass "strand" technique with NO CSS blur filters.
    // Dozens of thin, highly-transparent strands following a similar path
    // create the volumetric look strictly through screen blending.
    const numStrands = 35; // Reduced from 80 for 60fps performance
    const numPoints = 60;  // Reduced from 120 for 60fps performance

    const strands = Array.from({ length: numStrands }, () => ({
      phase1: Math.random() * Math.PI * 2,
      phase2: Math.random() * Math.PI * 2,
      freq1: 0.02 + Math.random() * 0.03,
      freq2: 0.04 + Math.random() * 0.04,
      ampX: (Math.random() - 0.5) * 1.5,
      ampY: (Math.random() - 0.5) * 0.8,
      width: 2 + Math.random() * 4, // Slightly thicker to compensate for fewer strands
      alpha: 0.015 + Math.random() * 0.04, // Adjusted opacity for 1 pass
      hueOffset: (Math.random() - 0.5) * 10,
    }));

    let t = 0;

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Soft clear for trailing effect
      ctx.fillStyle = 'rgba(2, 2, 4, 0.4)';
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      // Screen composite for additive light (fire/smoke glow) without blur cost
      ctx.globalCompositeOperation = 'screen';

      const timeSpeed1 = 0.006;
      const timeSpeed2 = 0.010;

      // Cache the base path to save math
      const basePath = Array.from({ length: numPoints }, (_, i) => {
        const nx = i / (numPoints - 1);
        // Base diagonal curve: bows slightly downward
        const globalWaveX = Math.sin(t * 0.004 + nx * 3) * W * 0.08 * nx;
        const globalWaveY = Math.cos(t * 0.003 + nx * 2) * H * 0.04 * nx;

        const bx = W * 0.2 + W * 0.7 * nx + globalWaveX;
        const by = H * 0.85 - H * 0.7 * nx - Math.sin(nx * Math.PI) * H * 0.1 + globalWaveY;
        const spread = Math.pow(nx, 1.5) * W * 0.15;
        return { bx, by, spread };
      });

      // NO BLUR PASSES - Raw overlapping geometry loop
      strands.forEach(s => {
        ctx.beginPath();

        for (let i = 0; i < numPoints; i++) {
          const { bx, by, spread } = basePath[i];

          // To get true rolling smoke, strands need to spiral around the base path
          const twirlAngle = i * s.freq1 - t * timeSpeed1 + s.phase1;

          // The radius of the curl pulses using the second sine wave
          const twirlRadius = spread * (0.3 + 0.7 * Math.sin(i * s.freq2 - t * timeSpeed2 + s.phase2)) * s.ampX;

          // Compute spiraling offsets
          const noiseX = Math.cos(twirlAngle) * twirlRadius;
          const noiseY = Math.sin(twirlAngle) * twirlRadius * 0.6; // slightly squished vertically

          // Add subtle chaotic secondary noise to make edges look wispy
          const chaoticX = Math.sin(i * 0.1 + t * 0.02 + s.phase2) * spread * 0.2 * s.ampY;

          const px = bx + noiseX + chaoticX;
          const py = by + noiseY;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        const baseHue = 265;
        const hue = baseHue + s.hueOffset;

        // Gradient fades out at ends
        const grad = ctx.createLinearGradient(W * 0.2, H * 0.85, W * 0.9, H * 0.15);

        // Subtle, realistic volumetric opacity mapping
        grad.addColorStop(0.0, `hsla(${hue}, 40%, 40%, 0)`);
        grad.addColorStop(0.2, `hsla(${hue}, 80%, 65%, ${s.alpha})`);
        grad.addColorStop(0.6, `hsla(${hue}, 60%, 50%, ${s.alpha * 0.8})`);
        grad.addColorStop(1.0, `hsla(${hue}, 40%, 30%, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });

      ctx.restore();

      t += 1;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const cleanup = drawSmoke();
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return cleanup;

    const gsapCtx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      loadTl.fromTo(content.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.3);

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
        },
      });
      scrollTl.fromTo(content, { y: 0, opacity: 1 }, { y: -100, opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => {
      gsapCtx.revert();
      cleanup?.();
    };
  }, [drawSmoke]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-goat-black overflow-hidden z-10"
    >
      {/* Liquid Silk Wave Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-goat-purple/20 border border-goat-purple/30 rounded-full transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/5 cursor-default group">
          <span className="w-2 h-2 bg-goat-purple rounded-full animate-pulse group-hover:bg-white transition-colors duration-300" />
          <span className="font-mono text-xs uppercase tracking-wider text-goat-purple-light group-hover:text-white transition-colors duration-300">
            Where Brands Win
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-bold text-hero text-white leading-[1.1] mb-6 max-w-4xl">
          Making Content
          <br />
          Profitable
        </h1>

        {/* Subheadline */}
        <p className="text-goat-gray text-lg lg:text-xl max-w-2xl mb-10">
          Elevate your business with content that sells for you.
          <br className="hidden lg:block" />
          Get warm leads through social media and ads that make you money.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollToSection('pricing')}
            className="group flex items-center gap-2 px-8 py-4 bg-goat-purple hover:bg-goat-purple-light text-white font-medium rounded-full transition-all duration-300 hover:shadow-glow-lg"
          >
            <span>Get Started</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToSection('work')}
            className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-goat-purple/50 hover:border-goat-purple text-white font-medium rounded-full transition-all duration-300"
          >
            <Play size={18} className="text-goat-purple" />
            <span>View Our Work</span>
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-goat-black to-transparent pointer-events-none" />
    </section>
  );
}
