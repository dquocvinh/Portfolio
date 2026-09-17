import React, { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Copy, Linkedin, MapPin, Award } from 'lucide-react';
import { ReadingProgressBar } from '../components/blog/ReadingProgressBar';
import { PostContent } from '../components/blog/PostContent';
import { BlogCard } from '../components/blog/BlogCard';
import { TableOfContents } from '../components/blog/TableOfContents';
import { KeyTakeaways } from '../components/blog/KeyTakeaways';
import { PersonalNote } from '../components/blog/PersonalNote';
import { AuthorCard } from '../components/blog/AuthorCard';
import { CommentsSection } from '../components/blog/CommentsSection';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';
import postsData from '../data/blog/posts.json';
import type { BlogPost } from '../types/blog';

const posts = postsData as BlogPost[];
const BASE_URL = import.meta.env.BASE_URL;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  
  const post = useMemo(() => posts.find((p) => p.slug === slug) ?? null, [slug]);

  const relatedPosts = useMemo(
    () => posts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3),
    [slug, post]
  );

  if (!post) return <Navigate to="/blog" replace />;

  const imgSrc = `${BASE_URL}${post.coverImage.startsWith('/') ? post.coverImage.slice(1) : post.coverImage}`;
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-cream-100 font-body relative overflow-hidden">
      {/* ── Background Image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-15 z-0"
        style={{ backgroundImage: `url('${BASE_URL}blog_hero.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100/60 via-transparent to-cream-100 pointer-events-none z-0" />

      <ReadingProgressBar />

      {/* ── Minimal Navbar ── */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-6 md:px-10 flex justify-between items-center">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-taupe-200 hover:text-coffee-600 transition-colors text-sm font-bold uppercase tracking-wider group bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-sand-100"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </nav>

      {/* ── Article Header ── */}
      <header className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[10px] font-bold text-coffee-400 uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2">
            <span>{post.category}</span>
            {post.metadata.location && (
              <>
                <span className="w-1 h-1 rounded-full bg-sand-200" />
                <span className="flex items-center gap-1"><MapPin size={10}/> {post.metadata.location}</span>
              </>
            )}
            {post.metadata.certIssuer && (
              <>
                <span className="w-1 h-1 rounded-full bg-sand-200" />
                <span className="flex items-center gap-1"><Award size={10}/> {post.metadata.certIssuer}</span>
              </>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-[64px] font-bold text-espresso-100 leading-[1.1] mb-6">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-xl md:text-2xl text-taupe-200 font-display italic mb-8 max-w-2xl mx-auto">
              {post.subtitle}
            </p>
          )}

          <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-taupe-300 uppercase tracking-widest">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-sand-200" />
            <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime} MIN READ</span>
          </div>
        </motion.div>
      </header>

      {/* ── Cover Image ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 mb-16 relative z-10"
      >
        <div className="aspect-[21/9] w-full overflow-hidden bg-cream-50">
          <img
            src={imgSrc}
            alt={post.title}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* ── Main Layout: Content + TOC ── */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-16 relative z-10 pb-20">
        
        {/* Content Column (max-w-[760px] to ensure readability) */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full lg:max-w-[760px] mx-auto lg:mx-0"
        >
          {/* Post Body */}
          <PostContent html={post.content} />
          
          {/* Key Takeaways */}
          {post.keyTakeaways && (
            <KeyTakeaways takeaways={post.keyTakeaways} />
          )}

          {/* Personal Note */}
          {post.personalNote && (
            <PersonalNote note={post.personalNote} />
          )}

          {/* Author Card */}
          <AuthorCard />

          {/* Share Section */}
          <div className="py-8 border-y border-sand-100 flex items-center justify-between">
            <span className="text-xs font-bold text-taupe-300 uppercase tracking-widest">Share Article</span>
            <div className="flex gap-4">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 text-sm font-semibold text-espresso-100 hover:text-coffee-600 transition-colors"
              >
                <Copy size={16} /> {copied ? 'Link Copied!' : 'Copy Link'}
              </button>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-espresso-100 hover:text-coffee-600 transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-espresso-100 hover:text-coffee-600 transition-colors"
              >
                <span className="font-bold">𝕏</span> Post
              </a>
            </div>
          </div>

          {/* Comments Section */}
          <CommentsSection postSlug={post.slug} />
        </motion.article>

        {/* Sidebar (TOC) - Hidden on mobile, sticky on desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <TableOfContents />
        </aside>
      </div>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-white border-t border-sand-100 py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-xs font-bold text-taupe-300 uppercase tracking-[0.15em]">You May Also Like</span>
              <div className="h-px flex-1 bg-sand-100" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((p, idx) => (
                <BlogCard key={p.id} post={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <div className="relative z-10 bg-white">
        <Footer />
      </div>
      <ChatbotWidget context="blog" />
    </div>
  );
};

export default BlogPostPage;
