import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Cpu } from 'lucide-react';
import { BlogCard } from '../components/blog/BlogCard';
import { TagList } from '../components/blog/TagList';
import { CurrentlySection } from '../components/blog/CurrentlySection';
import Footer from '../components/Footer';
import postsData from '../data/blog/posts.json';
import type { BlogPost, BlogCategory } from '../types/blog';

const posts = postsData as BlogPost[];

type FilterCategory = 'all' | BlogCategory;

const FILTERS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'learning', label: 'Learning' },
  { key: 'travel', label: 'Travel' },
  { key: 'experience', label: 'Experience' },
];

const BASE_URL = import.meta.env.BASE_URL;
const BLOG_HERO_BG = `${BASE_URL}blog_hero.png`;

const BlogPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = useMemo(() => posts.find((p) => p.featured) ?? null, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = activeFilter === 'all' || p.category === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  const gridPosts = filteredPosts.filter((p) => !(p.featured && activeFilter === 'all' && !searchQuery));

  return (
    <div className="min-h-screen bg-cream-100 font-body">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-100/90 backdrop-blur-lg border-b border-sand-100/50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-taupe-200 hover:text-coffee-600 transition-colors text-sm font-semibold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Portfolio
          </Link>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
          >
            <Cpu className="text-coffee-600 w-6 h-6" />
            <span className="text-espresso-100">
              DQUOCVINH<span className="text-coffee-300">.AI</span>
            </span>
          </button>

          <div className="text-coffee-600 text-sm font-bold uppercase tracking-wider">
            Blog
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Transparent Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-20 z-0"
          style={{ backgroundImage: `url('${BLOG_HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/50 via-transparent to-cream-100 pointer-events-none z-0" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[10px] font-bold text-taupe-300 uppercase tracking-[0.2em] mb-6">
              Personal Journal · 2024 — 2026
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-espresso-100 mb-6 leading-[1.1] tracking-tight">
              Stories, lessons<br />
              <span className="italic text-coffee-600 font-medium">&amp; moments from my journey.</span>
            </h1>

            <p className="text-taupe-200 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
              A personal collection of things I've learned, places I've been, and experiences worth remembering.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-10 pb-20">

        {/* ── Featured Story ── */}
        <AnimatePresence>
          {featuredPost && activeFilter === 'all' && !searchQuery && (
            <motion.section
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-20"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold text-taupe-300 uppercase tracking-[0.15em]">Featured Story</span>
                <div className="h-px flex-1 bg-sand-100" />
              </div>
              <BlogCard post={featuredPost} featured />
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Explore Stories Header ── */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-bold text-taupe-300 uppercase tracking-[0.15em]">Explore Stories</span>
          <div className="h-px flex-1 bg-sand-100" />
        </div>

        {/* ── Filter & Search ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap rounded-sm ${activeFilter === key
                  ? 'bg-coffee-600 text-white shadow-sm'
                  : 'bg-transparent text-taupe-200 hover:text-espresso-100 hover:bg-sand-50'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe-300" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-sand-100 text-sm text-espresso-100 placeholder-taupe-200 rounded-full focus:outline-none focus:border-coffee-300 transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* ── Story Grid ── */}
        {gridPosts.length > 0 ? (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16"
          >
            <AnimatePresence>
              {gridPosts.map((post, idx) => (
                <BlogCard key={post.id} post={post} index={idx} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 border border-dashed border-sand-100 bg-white/50 mb-16"
          >
            <div className="text-4xl mb-4 text-taupe-200">🔍</div>
            <h3 className="font-display text-2xl font-bold text-espresso-100 mb-2">No stories found.</h3>
            <p className="text-taupe-200 text-sm">Try another keyword or explore all stories.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-6 px-6 py-2.5 border border-sand-100 text-coffee-600 bg-white hover:bg-sand-50 text-sm font-semibold transition-all"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* ── Topics & Currently ── */}
        <div className="grid md:grid-cols-12 gap-12 border-t border-sand-100 pt-12">
          <div className="md:col-span-4">
            <TagList onTagClick={(tag) => {
              setSearchQuery(tag);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }} />
          </div>
          <div className="md:col-span-8">
            <CurrentlySection />
          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default BlogPage;
