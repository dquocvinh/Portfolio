import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const sectionId = id.toLowerCase();

    // Check if on portfolio home page
    const isHomePage =
      window.location.hash === '' ||
      window.location.hash === '#/' ||
      window.location.hash.startsWith('#/?') ||
      window.location.hash.startsWith('#/about') ||
      window.location.hash.startsWith('#/skills') ||
      window.location.hash.startsWith('#/projects') ||
      window.location.hash.startsWith('#/certificates') ||
      window.location.hash.startsWith('#/experience') ||
      window.location.hash.startsWith('#/contact');

    if (isHomePage) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#/${sectionId}`);
      }
    } else {
      window.location.href = `/#/${sectionId}`;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-cream-100/90 backdrop-blur-lg border-b border-sand-100/50 py-4 md:py-5 shadow-sm'
        : 'bg-transparent py-6 md:py-7'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <div
          className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Cpu className="text-coffee-600 w-13 h-13 md:w-9 md:h-9" />
          <span className="text-espresso-100">
            DQUOCVINH<span className="text-coffee-300">.AI</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 lg:gap-10 text-base font-semibold text-taupe-200 items-center">
          {['About', 'Skills', 'Projects', 'Certificates', 'Experience', 'Contact'].map((item) => (
            <a
              key={item}
              href={`/#/${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item)}
              className="hover:text-coffee-300 transition-colors relative group py-1"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coffee-300 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#/blog"
            className="px-4 py-1.5 rounded-full bg-coffee-300/10 text-coffee-600 hover:bg-coffee-300 hover:text-white transition-all font-medium border border-coffee-300/30"
          >
            Blogs
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;