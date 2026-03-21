import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Edit, MessageSquare, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Submit',
    description: 'Upload your footage and share your vision. We accept all major formats.',
    icon: Upload,
  },
  {
    number: '02',
    title: 'Edit',
    description: 'Our expert editors craft your content with precision and creativity.',
    icon: Edit,
  },
  {
    number: '03',
    title: 'Review',
    description: 'Review the edit and provide feedback. Unlimited revisions on most plans.',
    icon: MessageSquare,
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Receive your final files in any format, ready to publish.',
    icon: Send,
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const stepsEl = stepsRef.current;
    const line = lineRef.current;

    if (!section || !heading || !stepsEl || !line) return;

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

      // Line draw animation
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsEl,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      const stepItems = stepsEl.querySelectorAll('.step-item');
      stepItems.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsEl,
              start: 'top 80%',
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
      className="relative w-full py-24 lg:py-32 bg-goat-black z-70"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-goat-purple mb-4 block">
            Our Process
          </span>
          <h2 className="font-bold text-section text-white mb-4">
            How It <span className="text-gradient-purple">Works</span>
          </h2>
          <p className="text-goat-gray text-lg max-w-2xl mx-auto">
            Simple, streamlined, and designed for businesses
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connector Line (Desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-goat-purple to-transparent origin-left"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="step-item relative flex flex-col items-center text-center">
                  {/* Number Circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-goat-card border-2 border-goat-purple flex items-center justify-center mb-6">
                    <span className="font-bold text-xl text-goat-purple">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-goat-purple/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-goat-purple" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl text-white mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-goat-gray text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
