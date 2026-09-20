import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Facebook, ArrowRight, ArrowLeft, Users, Eye } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL;

const Footer: React.FC = () => {
  const avatarSrc = `${BASE_URL}avatar_chatbot.png`;
  const location = useLocation();
  const isBlog = location.pathname.startsWith('/blog');

  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [isLoadingViews, setIsLoadingViews] = useState<boolean>(true);
  const [onlineUsers] = useState<number>(1);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        setIsLoadingViews(true);
        const isVisited = sessionStorage.getItem('dquocvinh_portfolio_visited');
        const endpoint = isVisited
          ? 'https://api.counterapi.dev/v2/duong-quoc-vinhs-team-5603/dquocvinh-portfolio'
          : 'https://api.counterapi.dev/v2/duong-quoc-vinhs-team-5603/dquocvinh-portfolio/up';

        const response = await fetch(endpoint);
        const json = await response.json();
        
        if (json && json.data && typeof json.data.up_count === 'number') {
          setTotalViews(json.data.up_count);
          sessionStorage.setItem('dquocvinh_portfolio_visited', 'true');
        }
      } catch (error) {
        console.error('Failed to fetch view count from CounterAPI:', error);
      } finally {
        setIsLoadingViews(false);
      }
    };

    fetchCounter();
  }, []);

  return (
    <footer className="border-t border-sand-100 py-12 px-6 bg-white">
      {/* Single Consolidated Container Div */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Logo / Avatar Link */}
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

        {/* Short Bio / Description */}
        <p className="text-taupe-200 text-sm max-w-md mb-6 leading-relaxed">
          AI Engineering Student · Passionate about Machine Learning, Deep Learning &amp; Personal Journaling.
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

        {/* CounterAPI: Online User & Total Views */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 text-xs font-medium text-taupe-300">
          {/* Online Users Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-cream-100/80 hover:bg-cream-100 rounded-full border border-sand-100/80 shadow-sm transition-all hover:border-coffee-300/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Users size={14} className="text-coffee-600" />
            <span>
              Online User: <strong className="text-espresso-100 font-semibold">{onlineUsers}</strong>
            </span>
          </div>

          {/* Total Views Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-cream-100/80 hover:bg-cream-100 rounded-full border border-sand-100/80 shadow-sm transition-all hover:border-coffee-300/40">
            <Eye size={14} className="text-coffee-600" />
            <span>
              Total Views:{' '}
              <strong className="text-espresso-100 font-semibold">
                {isLoadingViews ? (
                  <span className="inline-block w-8 h-3 bg-sand-200/60 animate-pulse rounded align-middle"></span>
                ) : (
                  totalViews !== null ? totalViews.toLocaleString() : '---'
                )}
              </strong>
            </span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full max-w-xl border-t border-sand-100/80 mb-6" />

        {/* Copyright & Dynamic Page Navigation Link */}
        <p className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm text-taupe-300">
          {isBlog ? (
            <Link
              to="/"
              className="text-coffee-600 font-bold hover:text-coffee-400 transition-colors uppercase tracking-wider text-xs inline-flex items-center gap-1"
            >
              <ArrowLeft size={12} /> Return to Portfolio
            </Link>
          ) : (
            <Link
              to="/blog"
              className="text-coffee-600 font-bold hover:text-coffee-400 transition-colors uppercase tracking-wider text-xs inline-flex items-center gap-1"
            >
              Explore Blog / Journal <ArrowRight size={12} />
            </Link>
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;