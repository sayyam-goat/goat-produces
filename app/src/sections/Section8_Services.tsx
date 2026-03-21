import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Video,
  Lightbulb,
  Image,
  Sparkles,
  Mic,
  CheckCircle,
  FileText,
  Zap,
  Clock,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: 'Video Editing', icon: Video },
  { name: 'Content Strategy', icon: Lightbulb },
  { name: 'Thumbnail Design', icon: Image },
  { name: 'Motion Graphics', icon: Sparkles },
  { name: 'Voice-Over Direction', icon: Mic },
];

const deliverables = [
  { name: 'Clear process', icon: CheckCircle },
  { name: 'Tasteful, premium visuals', icon: Image },
  { name: 'Fast, consistent delivery', icon: Clock },
  { name: 'Documentation & SOPs', icon: FileText },
  { name: '24/7 Support', icon: Zap },
];

export function Section8_Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        left.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Right content animation
      const rightItems = right.querySelectorAll('.service-item');
      gsap.fromTo(
        rightItems,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: right,
            start: 'top 80%',
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
      id="services"
      className="relative w-full min-h-screen bg-goat-black py-20 lg:py-32 z-80"
    >
      <div className="px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column */}
          <div ref={leftRef} className="lg:w-[40%]">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral mb-4 block">
              Services
            </span>
            <h2 className="font-heading font-bold text-section text-goat-white mb-6">
              What we <span className="text-goat-coral">do</span>
            </h2>
            <p className="text-goat-gray text-base lg:text-lg leading-relaxed">
              End-to-end editing and content systems for businesses and brands. We
              handle everything from strategy to final delivery.
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="lg:w-[60%] space-y-12">
            {/* Services List */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-goat-gray mb-6">
                Our Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className="service-item flex items-center gap-3 p-4 rounded-lg bg-goat-dark border border-white/5 hover:border-goat-coral/30 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-goat-coral/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-goat-coral" />
                      </div>
                      <span className="text-goat-white font-medium">
                        {service.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deliverables List */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-goat-gray mb-6">
                What You Get
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deliverables.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="service-item flex items-center gap-3 p-4 rounded-lg bg-goat-dark border border-white/5 hover:border-goat-coral/30 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-goat-coral/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-goat-coral" />
                      </div>
                      <span className="text-goat-white font-medium">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
