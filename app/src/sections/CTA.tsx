import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Calendar, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 lg:py-32 bg-goat-black z-120"
    >
      {/* Purple gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-goat-purple/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        <div ref={contentRef} className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-goat-purple/20 border border-goat-purple/30 rounded-full">
            <span className="w-2 h-2 bg-goat-purple rounded-full animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-goat-purple-light">
              Let's Work Together
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-bold text-section text-white mb-6">
            Ready to Elevate
            <br />
            Your <span className="text-gradient-purple">Content</span>?
          </h2>

          {/* Subheadline */}
          <p className="text-goat-gray text-lg lg:text-xl max-w-2xl mx-auto mb-10">
            Let's create something extraordinary together.
            Join hundreds of creators who trust GOAT Produces.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://wa.me/46737519724"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 bg-goat-purple hover:bg-goat-purple-light text-white font-medium rounded-full transition-all duration-300 hover:shadow-glow-lg"
            >
              <span>Get Started Now</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="https://calendly.com/sayyam-goat7/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-goat-purple/50 hover:border-goat-purple text-white font-medium rounded-full transition-all duration-300"
            >
              <Calendar size={18} className="text-goat-purple" />
              <span>Book a Call</span>
            </a>
          </div>

          {/* Email signup */}
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-goat-gray" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-goat-dark border border-white/10 rounded-xl text-white placeholder:text-goat-gray focus:outline-none focus:border-goat-purple/50 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-goat-purple hover:bg-goat-purple-light text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-70"
              >
                {isSubmitted ? (
                  <span>Subscribed!</span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>
            <p className="text-goat-gray text-xs mt-3">
              Get editing tips, industry insights, and exclusive offers.
            </p>
          </form>

          {/* Contact info */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <p className="text-goat-gray text-sm">
              Or reach us directly at{' '}
              <a
                href="mailto:hello@goatproduces.com"
                className="text-goat-purple hover:text-goat-purple-light transition-colors"
              >
                hello@goatproduces.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
