import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What is your turnaround time?',
    answer: 'Our standard turnaround time is 24-36 hours for all projects.',
  },
  {
    question: 'How do I submit my footage?',
    answer: 'We accept footage through Google Drive, Dropbox, WeTransfer, or any cloud storage service. After you sign up, you\'ll receive access to our client portal where you can easily upload files and track your projects.',
  },
  {
    question: 'What if I don\'t like the edit?',
    answer: 'We offer revisions on all packages. Starter plans include 2 revisions, while Professional and Enterprise plans include unlimited revisions. We work closely with you until you\'re 100% satisfied with the final product.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Due to the nature of our services, we don\'t offer refunds once work has begun. However, if you\'re unsatisfied with the initial edit, we\'ll work with you to make it right through our revision process.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: "According to our cancellation policy if you are unsatisfied with the services, you may cancel once the package reaches it's midpoint & the deposit is made. 24-36 hours turnaround",
  },
  {
    question: 'What formats do you deliver?',
    answer: 'We deliver in any format you need — MP4, MOV, ProRes, and more. We can optimize for specific platforms like YouTube, Instagram, TikTok, or provide raw files for your own distribution.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const accordion = accordionRef.current;

    if (!section || !heading || !accordion) return;

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

      // Accordion items animation
      const items = accordion.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accordion,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-goat-black z-110"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-goat-purple mb-4 block">
            FAQ
          </span>
          <h2 className="font-bold text-section text-white mb-4">
            Frequently Asked <span className="text-gradient-purple">Questions</span>
          </h2>
          <p className="text-goat-gray text-lg">
            Everything you need to know about our services
          </p>
        </div>

        {/* Accordion */}
        <div ref={accordionRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-goat-dark border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-300"
              >
                <span className="font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-goat-purple shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                    }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
              >
                <p className="px-6 pb-6 text-goat-gray leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
