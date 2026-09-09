import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
const BASE_URL = import.meta.env.BASE_URL;
const PORTRAIT_PHOTO = `${BASE_URL}portrait-photo.png`;

const About = () => (
  <Section id="about">
    <SectionTitle subtitle="Get to know me better">About Me</SectionTitle>
    <div className="grid md:grid-cols-2 gap-16 items-start">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-6 text-lg text-[#2C2C2C] leading-relaxed"
      >
        <p>
          I'm an AI Engineering student at{' '}
          <span className="font-semibold text-[#654321]">Ton Duc Thang University</span>,
          building end-to-end{' '}
          <span className="font-semibold text-[#654321]">machine learning solutions</span> — from
          model training to production deployment.
        </p>
        <p>
          My work spans{' '}
          <span className="font-semibold text-[#D99E3A]">NLP, Computer Vision, and Generative AI</span>,
          with hands-on experience fine-tuning transformer models (BERT, BLIP), building{' '}
          <span className="font-semibold text-[#654321]">RAG pipelines with LangChain</span>, and
          deploying ML applications on cloud platforms. I'm driven by turning research into real-world impact.
        </p>
        <blockquote className="relative border-l-4 border-[#D99E3A] bg-gradient-to-r from-[#D99E3A]/15 via-[#D99E3A]/5 to-transparent px-6 py-5 rounded-r-2xl my-6 shadow-sm">
          <p className="text-lg italic font-medium text-[#4A321A] leading-relaxed">
            "I don't just build models — I build solutions that people can actually use."
          </p>
          <footer className="mt-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#D99E3A] flex items-center gap-2">
            <span className="w-6 h-[2px] bg-[#D99E3A] inline-block"></span>
            From research to production
          </footer>
        </blockquote>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Major', value: 'Computer Science (AI)' },
            { label: 'Focus', value: 'Deep Learning & MLOps' },
            { label: 'Location', value: 'Ho Chi Minh City' },
            { label: 'Status', value: 'Open for Internships' },
          ].map((item) => (
            <div key={item.label} className="px-5 py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div className="text-[#0A0A0A] font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-8"
      >
        <div className="relative group w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-tr from-coffee-300 via-gold-300 to-gold-400 rounded-2xl blur-2xl opacity-25 group-hover:opacity-45 transition-opacity duration-500"></div>
          <div className="relative aspect-[4/5] sm:aspect-square rounded-2xl bg-white border border-sand-100/80 overflow-hidden shadow-2xl group-hover:border-gold-300/50 transition-all duration-300">
            <img
              src={PORTRAIT_PHOTO}
              alt="Dương Quốc Vinh"
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-100/30 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
        </div>

        <a
          href="/duongquocvinh_resume.pdf"
          download="duongquocvinh_resume.pdf"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-coffee-300 to-gold-400 hover:from-coffee-400 hover:to-gold-300 text-white rounded-lg font-semibold transition-all shadow-lg shadow-coffee-300/25 hover:shadow-gold-300/40 hover:-translate-y-1 relative z-10"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          My Resume
        </a>
      </motion.div>
    </div>
  </Section>
);

export default About;