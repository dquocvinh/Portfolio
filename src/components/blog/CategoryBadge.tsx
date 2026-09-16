import React from 'react';
import type { BlogCategory } from '../../types/blog';
import { BookOpen, Plane, Sparkles } from 'lucide-react';

interface CategoryBadgeProps {
  category: BlogCategory;
  size?: 'sm' | 'md';
}

const config: Record<BlogCategory, { label: string; icon: React.ElementType; className: string }> = {
  learning: {
    label: 'Learning',
    icon: BookOpen,
    className: 'bg-coffee-300/10 text-coffee-300 border-coffee-300/30',
  },
  travel: {
    label: 'Travel',
    icon: Plane,
    className: 'bg-gold-400/10 text-gold-400 border-gold-400/30',
  },
  experience: {
    label: 'Experience',
    icon: Sparkles,
    className: 'bg-taupe-200/10 text-taupe-300 border-taupe-200/30',
  },
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'sm' }) => {
  const { label, icon: Icon, className } = config[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full font-semibold tracking-wide uppercase ${className} ${
        size === 'sm' ? 'text-[10px] px-2.5 py-1' : 'text-xs px-3 py-1.5'
      }`}
    >
      <Icon size={size === 'sm' ? 10 : 12} />
      {label}
    </span>
  );
};
