import React from 'react';
import { motion } from 'framer-motion';

const TOPICS = [
  'Learning',
  'Travel',
  'React',
  'AI Engineering',
  'Life',
  'University',
  'Data Analytics',
];

interface TagListProps {
  onTagClick?: (tag: string) => void;
}

export const TagList: React.FC<TagListProps> = ({ onTagClick }) => {
  return (
    <div className="py-8">
      <h3 className="text-xs font-semibold text-taupe-300 uppercase tracking-widest mb-6">Explore by Topics</h3>
      <div className="flex flex-wrap gap-2.5">
        {TOPICS.map((topic, idx) => (
          <motion.button
            key={topic}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            onClick={() => onTagClick?.(topic)}
            className="px-4 py-2 bg-white border border-sand-100 text-sm font-medium text-taupe-200 hover:border-coffee-300/40 hover:text-coffee-600 rounded-full transition-colors shadow-xs"
          >
            #{topic}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
