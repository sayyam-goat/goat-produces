import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Work', id: 'work' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-goat-black/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 transition-opacity hover:opacity-80 flex-shrink-0 group"
              aria-label="Home"
            >
              <img
                src="/GOAT Produces Site.png"
                alt="GOAT Produces Logo"
                className="h-8 md:h-10 w-auto object-contain animate-[spin-y_4s_linear_infinite]"
                style={{ transformStyle: 'preserve-3d' }}
              />
              <span className="font-bold text-xl lg:text-2xl text-white tracking-tight">
                GOAT<span className="text-goat-purple">.</span>Produces
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm text-goat-gray hover:text-white transition-colors group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-goat-purple transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <a
                href="https://wa.me/46737519724"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-goat-purple hover:bg-goat-purple-light text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-glow inline-block text-center"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-goat-black/98 backdrop-blur-xl transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-2xl font-bold text-white hover:text-goat-purple transition-colors"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://wa.me/46737519724"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 bg-goat-purple hover:bg-goat-purple-light text-white font-medium rounded-full transition-all duration-300 inline-block text-center"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
