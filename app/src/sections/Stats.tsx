import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1500, suffix: '+', label: 'Videos Edited' },
  { value: 50, suffix: 'M+', label: 'Views Generated' },
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 99, suffix: '%', label: 'Satisfaction Rate' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        onEnter: () => {
          gsap.to({ value: 0 }, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].value));
            },
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statsEl = statsRef.current;

    if (!section || !statsEl) return;

    const ctx = gsap.context(() => {
      const items = statsEl.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-goat-black z-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-bold text-5xl lg:text-7xl text-white mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-goat-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
