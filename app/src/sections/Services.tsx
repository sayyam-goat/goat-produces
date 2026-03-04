import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Clapperboard, Lightbulb, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Film,
    title: 'Short-Form Content',
    description: 'Reels, TikToks, and Shorts that stop the scroll. High-retention editing with viral hooks.',
    features: ['Reels & TikToks', 'YouTube Shorts', 'Viral Hooks', 'Trending Audio'],
  },
  {
    icon: Clapperboard,
    title: 'Long-Form Content',
    description: 'YouTube videos and documentaries that engage. Cinematic storytelling that keeps viewers watching.',
    features: ['YouTube Videos', 'Documentaries', 'Courses', 'Podcasts'],
  },
  {
    icon: Lightbulb,
    title: 'Content Strategy',
    description: 'Thumbnails, SEO, and analytics that grow your channel. Data-driven decisions for maximum growth.',
    features: ['Thumbnail Design', 'SEO Optimization', 'Analytics', 'Growth Strategy'],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

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

      // Cards animation
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-goat-black z-30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-goat-purple mb-4 block">
            Our Services
          </span>
          <h2 className="font-bold text-section text-white mb-4">
            What We <span className="text-gradient-purple">Do</span>
          </h2>
          <p className="text-goat-gray text-lg max-w-2xl mx-auto">
            End-to-end video editing solutions for creators who demand excellence
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative p-8 lg:p-10 rounded-2xl bg-goat-card glow-border cursor-pointer"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-goat-purple/10 flex items-center justify-center mb-6 group-hover:bg-goat-purple/20 transition-colors duration-300">
                  <Icon size={28} className="text-goat-purple" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl lg:text-2xl text-white mb-3 group-hover:text-goat-purple-light transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-goat-gray text-sm lg:text-base mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-goat-gray">
                      <span className="w-1.5 h-1.5 bg-goat-purple rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <a
                  href="https://wa.me/46737519724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-goat-purple group-hover:text-goat-purple-light transition-colors duration-300"
                >
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
