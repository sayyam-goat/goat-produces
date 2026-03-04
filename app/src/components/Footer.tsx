import { Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-goat-black border-t border-white/5 z-130">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div>
            <h3 className="font-bold text-2xl text-white mb-2">
              GOAT<span className="text-goat-purple">.</span>Produces
            </h3>
            <p className="text-goat-gray text-sm">
              Elevate Your Content. Dominate Your Niche.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-goat-gray hover:text-white transition-colors text-sm"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-goat-dark border border-white/5 flex items-center justify-center text-goat-gray hover:text-goat-purple hover:border-goat-purple/30 transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-goat-gray text-xs">
            © {new Date().getFullYear()} GOAT Produces. All rights reserved.
          </p>
          <p className="text-goat-gray text-xs">
            Crafted with passion for creators worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
