import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
import { Mail, Github, Linkedin, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <Section id="contact" className="py-32">
      <SectionTitle subtitle="Let's connect">Contact Me</SectionTitle>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-cream-100 p-8 md:p-16 rounded-3xl border border-sand-100 text-center relative overflow-hidden shadow-lg"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-espresso-100 mb-6 relative z-10 font-display">
          Let's Work Together
        </h2>
        
        {/* White gradient shine background overlay */}
        <div className="absolute -inset-y-[100%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-tr from-transparent via-white/40 to-transparent transform -rotate-12 pointer-events-none blur-sm" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-300/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <p className="text-taupe-200 mb-10 max-w-xl mx-auto text-lg relative z-10">
          I'm currently looking for internship opportunities or collaboration on AI projects.
          Feel free to reach out!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
          <a
            href="mailto:duongquocvinh9029@gmail.com"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-coffee-300 hover:bg-gold-300 text-white rounded-full font-bold tracking-wide transition-all shadow-lg shadow-coffee-300/25 hover:shadow-gold-300/50 hover:-translate-y-1 w-full sm:w-auto group"
          >
            <Mail size={20} className="group-hover:rotate-12 transition-transform" />
            <span>Say Hello</span>
          </a>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/dquocvinh"
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-white/80 backdrop-blur-md rounded-full hover:bg-sand-50 hover:text-coffee-300 transition-all text-taupe-200 border border-sand-100 hover:border-coffee-300/50 hover:-translate-y-1 shadow-lg hover:shadow-coffee-300/20 group"
            >
              <Github size={24} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/d%C6%B0%C6%A1ng-qu%E1%BB%91c-vinh-619b51412/"
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-white/80 backdrop-blur-md rounded-full hover:bg-sand-50 hover:text-coffee-300 transition-all text-taupe-200 border border-sand-100 hover:border-coffee-300/50 hover:-translate-y-1 shadow-lg hover:shadow-coffee-300/20 group"
            >
              <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/8129029sng"
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-white/80 backdrop-blur-md rounded-full hover:bg-sand-50 hover:text-coffee-300 transition-all text-taupe-200 border border-sand-100 hover:border-coffee-300/50 hover:-translate-y-1 shadow-lg hover:shadow-coffee-300/20 group"
            >
              <Facebook size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Contact;