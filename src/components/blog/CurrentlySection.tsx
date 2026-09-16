import React from 'react';
import { BookOpen, MapPin, Headphones, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export const CurrentlySection: React.FC = () => {
  return (
    <div className="py-12 border-t border-sand-100">
      <h3 className="text-xs font-semibold text-taupe-300 uppercase tracking-widest mb-8 text-center md:text-left">
        Currently
      </h3>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white p-5 border border-sand-100 rounded-2xl shadow-xs"
        >
          <div className="flex items-center gap-2 mb-3 text-coffee-400">
            <BookOpen size={16} />
            <span className="text-xs font-bold uppercase tracking-wide">Learning</span>
          </div>
          <p className="text-espresso-100 font-medium text-sm leading-relaxed">
            System Design & Advanced React Architecture
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white p-5 border border-sand-100 rounded-2xl shadow-xs"
        >
          <div className="flex items-center gap-2 mb-3 text-gold-500">
            <MapPin size={16} />
            <span className="text-xs font-bold uppercase tracking-wide">Exploring</span>
          </div>
          <p className="text-espresso-100 font-medium text-sm leading-relaxed">
            Ho Chi Minh City hidden coffee shops
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white p-5 border border-sand-100 rounded-2xl shadow-xs"
        >
          <div className="flex items-center gap-2 mb-3 text-taupe-300">
            <Headphones size={16} />
            <span className="text-xs font-bold uppercase tracking-wide">Listening</span>
          </div>
          <p className="text-espresso-100 font-medium text-sm leading-relaxed">
            Lex Fridman Podcast
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-white p-5 border border-sand-100 rounded-2xl shadow-xs"
        >
          <div className="flex items-center gap-2 mb-3 text-coffee-600">
            <Lightbulb size={16} />
            <span className="text-xs font-bold uppercase tracking-wide">Thinking about</span>
          </div>
          <p className="text-espresso-100 font-medium text-sm leading-relaxed">
            AI Ethics and the future of coding
          </p>
        </motion.div>
      </div>
    </div>
  );
};
