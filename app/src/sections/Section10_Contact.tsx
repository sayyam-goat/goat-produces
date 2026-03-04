import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Section10_Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
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
      setMessage('');
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-goat-black py-20 lg:py-32 z-100"
    >
      <div className="px-6 lg:px-[8vw]">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-goat-coral mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-heading font-bold text-section text-goat-white mb-6">
            Ready to level up
            <br />
            your <span className="text-goat-coral">content</span>?
          </h2>
          <p className="text-goat-gray text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Tell us what you're building. We'll reply within 48 hours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="mailto:hello@goatproduces.studio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-goat-coral rounded-full text-goat-white font-medium hover:bg-goat-coral/90 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span>Start a project</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="mailto:hello@goatproduces.studio"
              className="inline-flex items-center gap-2 text-goat-gray hover:text-goat-white transition-colors"
            >
              <Mail size={18} />
              <span className="text-sm">Or email hello@goatproduces.studio</span>
            </a>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto text-left"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-goat-gray text-sm mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-goat-dark border border-white/10 rounded-lg text-goat-white placeholder:text-goat-gray/50 focus:outline-none focus:border-goat-coral/50 transition-colors"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-goat-gray text-sm mb-2"
              >
                Tell us about your project
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'm looking for help with..."
                rows={4}
                className="w-full px-4 py-3 bg-goat-dark border border-white/10 rounded-lg text-goat-white placeholder:text-goat-gray/50 focus:outline-none focus:border-goat-coral/50 transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-goat-coral rounded-lg text-goat-white font-medium hover:bg-goat-coral/90 transition-all duration-300 disabled:opacity-70"
            >
              {isSubmitted ? (
                <>
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
