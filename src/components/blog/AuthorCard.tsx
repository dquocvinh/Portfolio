import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL;

export const AuthorCard: React.FC = () => {
  const avatarSrc = `${BASE_URL}avatar_chatbot.png`;

  return (
    <div className="my-16 p-8 border border-sand-100 bg-white rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
      <div className="w-24 h-24 rounded-full bg-cream-100 overflow-hidden shrink-0 border border-sand-100 shadow-sm p-0.5">
        <img
          src={avatarSrc}
          alt="Duong Quoc Vinh"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="text-[10px] font-bold text-taupe-300 uppercase tracking-widest mb-2">
          Written by Vinh
        </h4>
        <p className="font-semibold text-espresso-100 text-lg mb-2">
          Student · Developer · Curious
        </p>
        <p className="text-taupe-200 leading-relaxed mb-4">
          I write about things I learn, places I go, and experiences worth remembering. 
          Currently studying AI Engineering and always exploring new ways to solve problems.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-coffee-600 hover:text-coffee-400 transition-colors"
        >
          View Portfolio <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};
