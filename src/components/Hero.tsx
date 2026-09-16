import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TypewriterText from './TypewriterText';

const BASE_URL = import.meta.env.BASE_URL;
const HERO_BG = `${BASE_URL}hero_image.png`;

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 pt-20 bg-cream-100">
    {/* Background Image với độ trong suốt 70% (opacity 30%) */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-30 z-0"
      style={{ backgroundImage: `url(${HERO_BG})` }}
    />

    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
           style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(204, 183, 0, 0.15) 1px, transparent 0)',
               backgroundSize: '25px 25px',
           }}
      ></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-300/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-coffee-300/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-coffee-100/5 rounded-full blur-[100px]"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 max-w-4xl"
    >
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 border border-gold-300/40 rounded-full bg-gold-300/10 text-coffee-300 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(200,150,62,0.25)] hover:bg-gold-300/20 hover:border-gold-300/60 transition-all cursor-default backdrop-blur-sm group">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-400 shadow-[0_0_8px_#c8963e]"></span>
        </span>
        <span className="bg-gradient-to-r from-coffee-300 via-gold-400 to-coffee-600 bg-clip-text text-transparent font-semibold tracking-wider">
          AVAILABLE FOR INTERNSHIPS
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-espresso-100 mb-8 tracking-tight leading-tight min-h-[120px] md:min-h-[180px] font-display">
        <TypewriterText text="Building " delay={200} />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-300 via-gold-300 to-coffee-600">
          <TypewriterText text="Intelligence" delay={700} speed={60} />
        </span>
        <br />
        <TypewriterText text="from Data." delay={1500} />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          className="inline-block w-1 md:w-2 h-10 md:h-16 bg-coffee-300 ml-2 align-middle -mt-2 md:-mt-4"
        />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="text-xl md:text-2xl text-taupe-200 mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        <TypewriterText
          text="Hi, I'm Vinh. An AI Engineering Student passionate about Machine Learning, Deep Learning, and solving real-world problems with code."
          delay={2200}
          speed={25}
        />
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
      >
        <a
          href="#projects"
          className="px-8 py-4 bg-gradient-to-r from-coffee-300 to-gold-400 hover:from-coffee-400 hover:to-gold-300 text-white rounded-full font-bold tracking-wide transition-all shadow-lg shadow-coffee-300/25 hover:shadow-gold-300/50 hover:-translate-y-1 w-full sm:w-auto text-lg flex items-center justify-center gap-2 group"
        >
          <span>View My Work</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </a>
        <a
          href="#contact"
          className="px-8 py-4 bg-white/80 backdrop-blur-md border border-sand-100 hover:border-coffee-300/50 hover:bg-sand-50 text-espresso-100 hover:text-espresso-100 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-coffee-300/20 hover:-translate-y-1 w-full sm:w-auto text-lg flex items-center justify-center gap-2 group"
        >
          <span>Contact Me</span>
        </a>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-taupe-200 flex flex-col items-center gap-2 z-10"
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <ChevronDown className="animate-bounce" size={24} />
    </motion.div>
  </section>
);

export default Hero;