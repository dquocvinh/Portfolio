import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

const BASE_URL = import.meta.env.BASE_URL;

export const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0, featured = false }) => {
  const imgSrc = `${BASE_URL}${post.coverImage.startsWith('/') ? post.coverImage.slice(1) : post.coverImage}`;
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).toUpperCase();

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="group relative overflow-hidden bg-white border border-sand-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-coffee-300/50 transition-all duration-300"
      >
        <Link to={`/blog/${post.slug}`} className="block">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image (55%) */}
            <div className="relative h-64 md:h-full md:min-h-[400px] overflow-hidden bg-cream-50">
              <img
                src={imgSrc}
                alt={post.title}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Content (45%) */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
              <div className="flex items-center gap-3 mb-6">
                <CategoryBadge category={post.category} size="md" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso-100 mb-4 leading-tight group-hover:text-coffee-600 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-taupe-200 text-lg leading-relaxed mb-8 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-taupe-300 tracking-wider mb-8">
                <span>{formattedDate}</span>
                <span className="w-1 h-1 rounded-full bg-sand-200"></span>
                <span className="flex items-center gap-1.5 uppercase"><Clock size={12} /> {post.readTime} MIN READ</span>
              </div>

              <span className="inline-flex items-center gap-2 text-coffee-600 font-bold text-sm tracking-wide group-hover:gap-3 transition-all mt-auto uppercase">
                Read story <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Standard Card
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group relative overflow-hidden bg-white border border-sand-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-coffee-300/50 transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative h-56 overflow-hidden bg-cream-50 rounded-t-2xl">
          <img
            src={imgSrc}
            alt={post.title}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-1 bg-white rounded-b-2xl">
          <div className="flex items-center gap-4 text-[10px] font-bold text-taupe-300 tracking-wider mb-4 uppercase">
            <span className={
              post.category === 'learning' ? 'text-coffee-400' :
              post.category === 'travel' ? 'text-gold-500' : 'text-taupe-300'
            }>
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-sand-200"></span>
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-sand-200"></span>
            <span>{post.readTime} MIN</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-espresso-100 mb-3 leading-snug group-hover:text-coffee-600 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-taupe-200 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};
