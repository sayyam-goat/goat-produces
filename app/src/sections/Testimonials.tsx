import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "GOAT Produces transformed our content completely. The attention to detail and creative vision exceeded all expectations. Our engagement has never been higher.",
    author: 'James Carter',
    role: 'CEO at TechFlow Solutions',
    avatar: 'JC',
  },
  {
    quote: "Working with GOAT Produces was a game-changer. They understood our brand instantly and delivered edits that perfectly captured our vision. Truly world-class.",
    author: 'Sophia Martinez',
    role: 'Content Director at NexaCorp',
    avatar: 'SM',
  },
  {
    quote: "The turnaround time is incredible without sacrificing quality. GOAT Produces has become an essential part of our content creation workflow. Highly recommend!",
    author: 'David Reynolds',
    role: 'Head of Media at GrowthPeak',
  },
];

export function Testimonials() {
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
      className="relative w-full py-24 lg:py-32 bg-goat-black z-90"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-goat-purple mb-4 block">
            Testimonials
          </span>
          <h2 className="font-bold text-section text-white mb-4">
            What Clients <span className="text-gradient-purple">Say</span>
          </h2>
          <p className="text-goat-gray text-lg max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied creators
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative p-8 lg:p-10 rounded-2xl bg-goat-card glow-border"
            >
              {/* Quote Icon */}
              <Quote size={32} className="text-goat-purple/40 mb-6" />

              {/* Quote Text */}
              <p className="text-white text-base lg:text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-goat-purple/20 flex items-center justify-center">
                  <span className="font-bold text-goat-purple">
                    {testimonial.avatar || testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-goat-gray text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
