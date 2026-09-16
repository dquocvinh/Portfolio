import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

function PortfolioHome() {
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

export default function App() {
  // Handle Giscus OAuth callback redirect when using HashRouter
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('giscus')) {
      const savedSlug = sessionStorage.getItem('giscus_last_slug') || '';
      const search = window.location.search;
      if (savedSlug && !window.location.hash.includes(`/blog/${savedSlug}`)) {
        window.location.href = `${window.location.origin}${window.location.pathname}${search}#/blog/${savedSlug}`;
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<PortfolioHome />} />
      </Routes>
    </Router>
  );
}