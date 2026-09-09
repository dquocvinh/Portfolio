import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialContactPopup from './components/SocialContactPopup';
import ChatbotWidget from './components/ChatbotWidget';

export default function App() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <SocialContactPopup />
      <ChatbotWidget />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}