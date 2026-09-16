import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Facebook } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL;

export const BlogFooter: React.FC = () => {
  const avatarSrc = `${BASE_URL}avatar_chatbot.png`;

  return (
    <footer className="border-t border-sand-100 py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Logo / Avatar Link to Home */}
        <Link to="/" className="group mb-4 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sand-100 p-0.5 shadow-md group-hover:border-coffee-300 transition-all transform group-hover:scale-105 mb-2 bg-cream-50">
            <img
              src={avatarSrc}
              alt="Duong Quoc Vinh Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="font-display font-bold text-xl text-espresso-100 group-hover:text-coffee-600 transition-colors">
            Duong Quoc Vinh
          </h3>
        </Link>

        <p className="text-taupe-200 text-sm max-w-md mb-6">
          Personal Journal &amp; Notes on Learning, AI, Travel, and Experiences.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://github.com/dquocvinh"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-cream-100 hover:bg-sand-50 hover:text-coffee-300 transition-all text-taupe-200 rounded-full border border-sand-100 hover:border-coffee-300/50 hover:-translate-y-1 shadow-sm group"
            aria-label="GitHub"
          >
            <Github size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://www.linkedin.com/in/d%C6%B0%C6%A1ng-qu%E1%BB%91c-vinh-619b51412/"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-cream-100 hover:bg-sand-50 hover:text-coffee-300 transition-all text-taupe-200 rounded-full border border-sand-100 hover:border-coffee-300/50 hover:-translate-y-1 shadow-sm group"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://www.facebook.com/8129029sng"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-cream-100 hover:bg-sand-50 hover:text-coffee-300 transition-all text-taupe-200 rounded-full border border-sand-100 hover:border-coffee-300/50 hover:-translate-y-1 shadow-sm group"
            aria-label="Facebook"
          >
            <Facebook size={20} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Return to Portfolio & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-taupe-300 border-t border-sand-100/60 pt-6 w-full max-w-xl">
          <span>© {new Date().getFullYear()} Duong Quoc Vinh. All rights reserved.</span>
          <span className="hidden sm:inline text-sand-200">•</span>
          <Link
            to="/"
            className="text-coffee-600 font-bold hover:text-coffee-400 transition-colors uppercase tracking-wider text-xs inline-flex items-center gap-1"
          >
            ← Return to Portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
};
