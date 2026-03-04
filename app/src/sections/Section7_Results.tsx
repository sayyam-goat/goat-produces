import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '750K+', label: 'Subscribers added in 90 days' },
  { value: '3x', label: 'Watch-time improvement' },
  { value: '2x', label: 'Follower growth in 60 days' },
];

const testimonials = [
  {
    quote: "Had a great experience working with Sayyam. He really cared and showed a very high attention to detail. Would highly recommend!",
    author: 'Rahul',
    role: 'Personal Brand',
  },
  {
    quote: "Sayyam is a true professional. He deeply understands YouTube. His entry stood out above the others for creativity and professionalism. A true professional.",
    author: 'Nathan Crockett',
    role: 'YouTube Channel',
  },
];

export function Section7_Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statsEl = statsRef.current;
    const testimonialEl = testimonialRef.current;

    if (!section || !statsEl || !testimonialEl) return;

    const ctx = gsap.context(() => {
      // Stats animation
      const statItems = statsEl.children;
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsEl,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Testimonial animation
      gsap.fromTo(
        testimonialEl,
        { opacity: 0, y: 60, rotateX: 6 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonialEl,
            start: 'top 85%',
            end: 'top 60%',
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
      className="relative w-full min-h-screen bg-goat-black py-20 lg:py-32 z-70"
    >
      <div className="px-6 lg:px-[8vw]">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral mb-4 block">
            Results
          </span>
          <h2 className="font-heading font-bold text-section text-goat-white">
            Numbers That <span className="text-goat-coral">Speak</span>
          </h2>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-16 lg:mb-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-heading font-black text-5xl lg:text-7xl text-goat-white mb-2">
                {stat.value}
              </p>
              <p className="text-goat-gray text-sm lg:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div
          ref={testimonialRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 lg:p-8 rounded-[12px] bg-goat-dark border border-white/5"
            >
              {/* Quote Icon */}
              <Quote size={32} className="text-goat-coral/30 mb-4" />

              {/* Quote Text */}
              <p className="text-goat-white text-base lg:text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-goat-coral/20 flex items-center justify-center">
                  <span className="font-heading font-bold text-goat-coral text-sm">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-goat-white text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-goat-gray text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
