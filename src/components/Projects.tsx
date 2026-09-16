import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
import ProjectCard from './ProjectCard'; // Import directly
import projects from '../data/projects.json'; // Import directly

const Projects = () => {
  return (
    <Section id="projects" style={{ backgroundImage: "url('/homepage2.png')" }}>
      <SectionTitle subtitle="Some things I've built">Featured Projects</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))
        ) : (
          <div className="col-span-2 grid md:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-sand-100 p-8 animate-pulse">
                <div className="h-6 bg-sand-100 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-sand-100 rounded w-full mb-2"></div>
                <div className="h-4 bg-sand-100 rounded w-5/6 mb-8"></div>
                <div className="flex gap-2 mt-auto">
                  <div className="h-6 bg-sand-100 rounded-full w-20"></div>
                  <div className="h-6 bg-sand-100 rounded-full w-16"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-center mt-12">
        <a
          href="https://github.com/dquocvinh"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-md border border-sand-100 hover:border-coffee-300/50 hover:bg-sand-50 text-espresso-100 hover:text-espresso-100 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-coffee-300/20 hover:-translate-y-1 group"
        >
          <span>View more on GitHub</span>
          <Github size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </Section>
  );
};

export default Projects;