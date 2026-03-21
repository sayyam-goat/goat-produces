import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, Video, Star, Gem } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pricingTiers = [
  {
    name: 'Starter',
    price: '$600',
    period: '/month',
    description: 'Perfect for single video projects needing robust basics',
    icon: Video,
    features: [
      { name: '20 Long Videos', included: true },
      { name: 'Thumbnails for each video', included: false },
      { name: '1 revision/video', included: true },
      { name: 'Shorts', included: false },
      { name: 'B-Roll work', included: true },
      { name: 'Motion graphics / animations', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Director',
    price: '$900',
    period: '/month',
    description: 'For businesses who want premium quality and volume',
    icon: Star,
    features: [
      { name: '12 Long Videos', included: true },
      { name: '12 Thumbnails', included: true },
      { name: '2 revisions/video', included: true },
      { name: '15 Shorts (1 every 2 days)', included: true },
      { name: '1 Script for each video', included: true },
      { name: 'Priority Turnaround (2.5 days)', included: true },
      { name: '3D motion graphics & animations', included: true },
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Business Accelerator',
    price: '$1,700',
    period: '/month',
    description: 'Documentary-level, high-volume production ecosystem',
    icon: Gem,
    features: [
      { name: '15 Long Videos', included: true },
      { name: '30 Thumbnails (2 per video)', included: true },
      { name: '3 revisions/video', included: true },
      { name: '30 Shorts (1 per day)', included: true },
      { name: '30 Scripts (2 per video)', included: true },
      { name: 'Priority Turnaround (2 Days)', included: true },
      { name: '3D motion graphics & animations', included: true },
    ],
    cta: 'Get Started',
    popular: false,
  },
];

export function LongFormPricing() {
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
        const xOffset = index === 0 ? -50 : index === 2 ? 50 : 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: xOffset, y: index === 1 ? 30 : 0 },
          {
            opacity: 1,
            x: 0,
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
      className="relative w-full py-24 lg:py-32 bg-goat-black z-60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-goat-purple mb-4 block">
            Pricing
          </span>
          <h2 className="font-bold text-section text-white mb-4">
            Long-Form <span className="text-gradient-purple">Packages</span>
          </h2>
          <p className="text-goat-gray text-lg max-w-2xl mx-auto mb-6">
            YouTube videos, documentaries, courses — tailored for growth
          </p>
          <div className="inline-block px-4 py-3 bg-goat-purple/10 border border-goat-purple/20 rounded-xl text-left max-w-2xl">
            <p className="text-goat-purple-light text-sm font-medium mb-1">System Details:</p>
            <p className="text-goat-gray text-xs">
              These packages are valid for maximum of 45 days. If the package's duration exceeds said limit, a penalty fees of half the amount of originally agreed package will be charged.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`relative p-8 lg:p-10 rounded-2xl ${tier.popular
                  ? 'bg-gradient-to-b from-goat-purple/20 to-goat-card glow-border-popular'
                  : 'bg-goat-card glow-border'
                  }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-goat-purple text-white text-xs font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${tier.popular ? 'bg-goat-purple' : 'bg-goat-purple/10'
                  }`}>
                  <Icon size={24} className={tier.popular ? 'text-white' : 'text-goat-purple'} />
                </div>

                {/* Name */}
                <h3 className="font-bold text-xl text-white mb-2">{tier.name}</h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-bold text-4xl lg:text-5xl text-white">{tier.price}</span>
                  <span className="text-goat-gray text-sm">{tier.period}</span>
                </div>

                {/* Description */}
                <p className="text-goat-gray text-sm mb-6">{tier.description}</p>

                {/* CTA */}
                <a
                  href="https://wa.me/46737519724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center w-full py-3.5 rounded-xl font-medium transition-all duration-300 mb-8 ${tier.popular
                    ? 'bg-goat-purple hover:bg-goat-purple-light text-white hover:shadow-glow'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-goat-purple/50'
                    }`}
                >
                  {tier.cta}
                </a>

                {/* Features */}
                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-wider text-goat-gray mb-3">
                    What's Included
                  </p>
                  {tier.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${feature.included ? 'bg-goat-purple/20' : 'bg-goat-gray/10'}`}>
                        {feature.included ? (
                          <Check size={12} className="text-goat-purple" />
                        ) : (
                          <X size={12} className="text-goat-gray" />
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-goat-gray' : 'text-goat-gray/50 line-through'}`}>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
