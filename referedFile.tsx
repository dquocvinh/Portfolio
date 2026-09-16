// e:\MyPortfolio\my-portoflio\app\page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Github, Linkedin, Facebook, Mail, ChevronDown, ExternalLink, CheckCircle,
    Code2, Brain, Terminal, Cpu, Database, Award, X
} from 'lucide-react';
import { SocialContactPopup } from '@/app/components/SocialContactPopup';

const TypewriterText = ({ text, delay = 0, speed = 50, className = "" }: { text: string, delay?: number, speed?: number, className?: string }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let currentText = "";
        let currentIndex = 0;
        let timeout: NodeJS.Timeout;

        const startTyping = () => {
            timeout = setInterval(() => {
                if (currentIndex < text.length) {
                    currentText += text[currentIndex];
                    setDisplayedText(currentText);
                    currentIndex++;
                } else {
                    clearInterval(timeout);
                }
            }, speed);
        };

        const initialDelay = setTimeout(startTyping, delay);

        return () => {
            clearInterval(timeout);
            clearTimeout(initialDelay);
        };
    }, [text, delay, speed]);

    return <span className={className}>{displayedText}</span>;
};

// --- Components ---

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                <div
                    className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => router.push('/login')}
                    role="button"
                >
                    <Cpu className="text-cyan-500" />
                    <span className="text-slate-100">DQUOCVINH<span className="text-cyan-500">.AI</span></span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                    {['About', 'Skills', 'Projects', 'Certificates', 'Experience', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="hover:text-cyan-400 transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
};

const Section = ({ children, id, className = "", style }: { children: React.ReactNode, id?: string, className?: string, style?: React.CSSProperties }) => (
    <section id={id} className={`py-24 px-6 md:px-12 relative bg-center bg-no-repeat ${className}`} style={{ ...style, backgroundSize: 'cover' }}>
        {style?.backgroundImage && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px] z-0"></div>
        )}
        <div className="max-w-6xl mx-auto relative z-10">
            {children}
        </div>
    </section>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
    <div className="mb-16">
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white flex items-center gap-3"
        >
            <span className="w-2 h-8 bg-cyan-500 rounded-full inline-block"></span>
            {children}
        </motion.h2>
        {subtitle && (
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 mt-4 ml-5 text-lg max-w-2xl"
            >
                {subtitle}
            </motion.p>
        )}
    </div>
);

// --- Data ---
const ProjectCard = ({ project }: { project: any }) => {
    const [previewMode, setPreviewMode] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all ${previewMode ? 'row-span-2 col-span-1 md:col-span-2 h-[600px]' : 'hover:-translate-y-1'}`}
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.color}`}></div>

            {!previewMode ? (
                <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                        <div className="flex items-center gap-3">
                            {project.link && (
                                <button
                                    onClick={() => setPreviewMode(true)}
                                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
                                >
                                    <Terminal size={14} /> Live Sandbox
                                </button>
                            )}
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>
                    <p className="text-slate-400 mb-8 leading-relaxed flex-1">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {(() => {
                            let tags: string[] = [];
                            if (Array.isArray(project.tags)) {
                                tags = project.tags;
                            } else if (typeof project.tags === 'string') {
                                try {
                                    const parsed = JSON.parse(project.tags || '[]');
                                    tags = Array.isArray(parsed) ? parsed : [];
                                } catch {
                                    tags = project.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t);
                                }
                            }
                            return tags.map((tag: string) => (
                                <span key={tag} className="text-xs font-mono font-medium text-cyan-300 bg-cyan-950/50 px-3 py-1.5 rounded-md border border-cyan-900/50">
                                    {tag}
                                </span>
                            ));
                        })()}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full relative">
                    <div className="bg-slate-950 border-b border-slate-800 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                            </div>
                            <span className="text-sm font-mono text-slate-400 font-medium">Sandbox: {project.title}</span>
                        </div>
                        <button
                            onClick={() => setPreviewMode(false)}
                            className="text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 p-1.5 rounded-md transition-colors"
                        >
                            Close Preview
                        </button>
                    </div>
                    <div className="flex-1 bg-white relative">
                        <iframe
                            src={project.link}
                            className="w-full h-full border-none"
                            title={`Sandbox - ${project.title}`}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const skills = [
    { category: "Core AI & ML", icon: <Brain className="w-6 h-6 text-purple-400" />, items: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Transformers", "LLMs"] },
    { category: "Languages", icon: <Code2 className="w-6 h-6 text-cyan-400" />, items: ["Python", "C++", "Java", "TypeScript", "SQL"] },
    { category: "Data Engineering", icon: <Database className="w-6 h-6 text-emerald-400" />, items: ["Pandas", "NumPy", "Apache Spark", "MongoDB", "Vector DBs"] },
    { category: "DevOps & Tools", icon: <Terminal className="w-6 h-6 text-orange-400" />, items: ["Docker", "Git", "Linux", "AWS", "CI/CD"] }
];

export default function Home() {
    const [projects, setProjects] = useState<any[]>([]);
    const [certificates, setCertificates] = useState<any[]>([]);
    const [experience, setExperience] = useState<any[]>([]);
    const [selectedCert, setSelectedCert] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pRes, cRes, eRes] = await Promise.all([
                    fetch('/api/projects'),
                    fetch('/api/certificates'),
                    fetch('/api/experience')
                ]);

                if (pRes.ok) setProjects(await pRes.json());
                if (cRes.ok) setCertificates(await cRes.json());
                if (eRes.ok) setExperience(await eRes.json());
            } catch (error) {
                console.error("Failed to fetch portfolio data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-slate-950 min-h-screen text-slate-300 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
            <Navbar />
            <SocialContactPopup />

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 pt-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[100px]"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-default">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        AVAILABLE FOR INTERNSHIPS
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight min-h-[120px] md:min-h-[180px]">
                        <TypewriterText text="Building " delay={200} />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                            <TypewriterText text="Intelligence" delay={700} speed={60} />
                        </span> <br />
                        <TypewriterText text="from Data." delay={1500} />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            className="inline-block w-1 md:w-2 h-10 md:h-16 bg-cyan-500 ml-2 align-middle -mt-2 md:-mt-4"
                        />
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2, duration: 0.8 }}
                        className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
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
                        <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full font-bold tracking-wide transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:-translate-y-1 w-full sm:w-auto text-lg flex items-center justify-center gap-2 group">
                            <span>View My Work</span>
                            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </a>
                        <a href="#contact" className="px-8 py-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-200 hover:text-white rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 w-full sm:w-auto text-lg flex items-center justify-center gap-2 group">
                            <span>Contact Me</span>
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="animate-bounce" size={24} />
                </motion.div>
            </section>

            {/* About Section */}
            <Section id="about" className="bg-slate-900/20">
                <SectionTitle subtitle="Get to know me better">About Me</SectionTitle>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-lg text-slate-400 leading-relaxed"
                    >
                        <p>I am a second-year Computer Science student at the <span className="text-white font-medium">University of Science</span>, specializing in <span className="text-cyan-400 font-medium">Artificial Intelligence</span>.</p>
                        <p>My journey began with a curiosity about how machines learn. Today, I&apos;m building neural networks and exploring the frontiers of Computer Vision and NLP.</p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            {[{ label: "Major", value: "Computer Science (AI)" }, { label: "Focus", value: "Deep Learning & MLOps" }, { label: "Location", value: "Ho Chi Minh City" }].map((item, idx) => (
                                <div key={idx} className="px-5 py-3 bg-slate-900 rounded-xl border border-slate-800">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
                                    <div className="text-slate-200 font-medium">{item.value}</div>
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="relative aspect-square rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shadow-2xl hover:border-cyan-500/30 transition-all">
                                <div className="text-center p-8">
                                    <Brain size={80} className="text-cyan-500/50 mx-auto mb-4 group-hover:text-cyan-400 transition-colors" />
                                    <p className="text-slate-600 text-sm">Profile Image Placeholder</p>
                                </div>
                            </div>
                        </div>
                        <a
                            href="/public/DuongQuocVinh_0559149285.pdf"
                            download="/public/DuongQuocVinh_0559149285.pdf"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 relative z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            My Resume
                        </a>
                    </motion.div>
                </div>
            </Section>

            {/* Skills Section */}
            <Section id="skills">
                <SectionTitle subtitle="My technical toolkit">Technical Skills</SectionTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skillGroup, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900 transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                                    {skillGroup.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white">{skillGroup.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-slate-950 text-slate-400 text-sm rounded-full border border-slate-800 group-hover:text-cyan-100 group-hover:border-cyan-500/20 transition-all">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Projects Section */}
            <Section id="projects" style={{ backgroundImage: "url('/homepage2.png')" }}>
                <SectionTitle subtitle="Some things I&apos;ve built">Featured Projects</SectionTitle>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="https://github.com/vinh9029" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-200 hover:text-white rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 group">
                        <span>View more on GitHub</span>
                        <Github size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                </div>
            </Section>

            {/* Certificates Section */}
            <Section id="certificates">
                <SectionTitle subtitle="Professional certifications and achievements">Certificates</SectionTitle>
                <div className="grid md:grid-cols-2 gap-6">
                    {certificates.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all group overflow-hidden flex flex-col"
                        >
                            {/* Certificate Image / Link Area */}
                            <div
                                onClick={() => setSelectedCert(cert)}
                                className="relative h-48 bg-slate-950 block overflow-hidden group-hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                {cert.imageUrl ? (
                                    <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-700 bg-slate-950">
                                        <Award size={48} className="opacity-20" />
                                    </div>
                                )}
                                <span className="absolute bottom-3 right-3 bg-slate-900/80 text-cyan-400 text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm border border-slate-800">
                                    <CheckCircle size={12} /> Verified
                                </span>
                                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="bg-slate-900/80 text-white text-sm px-4 py-2 rounded-full font-medium backdrop-blur-md border border-slate-700 shadow-lg flex items-center gap-2">
                                        <Award size={16} className="text-cyan-400" /> View Certificate
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{cert.title}</h3>
                                    <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded bg-slate-950">{cert.date}</span>
                                </div>
                                <div className="text-cyan-500/80 text-sm font-medium mb-4">{cert.issuer}</div>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">{cert.desc}</p>
                                <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="mt-auto text-sm text-slate-500 hover:text-white inline-flex items-center gap-1 transition-colors">
                                    Verify Credential <ExternalLink size={12} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Experience Section */}
            <Section id="experience" style={{ backgroundImage: "url('/homepage1.png')" }}>
                <SectionTitle subtitle="My academic and professional journey">Experience</SectionTitle>
                <div className="max-w-3xl mx-auto">
                    <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12 pb-4">
                        {experience.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative pl-8 md:pl-12"
                            >
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-950 rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                                    <span className="text-sm font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900/50 w-fit">{item.year}</span>
                                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                                </div>
                                <div className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                                    {item.org}
                                </div>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Contact Section */}
            <Section id="contact" className="py-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-16 rounded-3xl border border-slate-800 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Let&apos;s Work Together</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg relative z-10">
                        I&apos;m currently looking for internship opportunities or collaboration on AI projects.
                        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
                        <a href="mailto:email@example.com" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full font-bold tracking-wide transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:-translate-y-1 w-full sm:w-auto group">
                            <Mail size={20} className="group-hover:rotate-12 transition-transform" />
                            <span>Say Hello</span>
                        </a>
                        <div className="flex justify-center gap-4">
                            <a href="https://github.com/vinh9029" target="_blank" rel="noreferrer" className="p-4 bg-slate-900/80 backdrop-blur-md rounded-full hover:bg-slate-800 hover:text-cyan-400 transition-all text-slate-400 border border-slate-700 hover:border-cyan-500/50 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20 group">
                                <Github size={24} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-4 bg-slate-900/80 backdrop-blur-md rounded-full hover:bg-slate-800 hover:text-blue-400 transition-all text-slate-400 border border-slate-700 hover:border-blue-500/50 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20 group">
                                <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="https://www.facebook.com/8129029sng" target="_blank" rel="noreferrer" className="p-4 bg-slate-900/80 backdrop-blur-md rounded-full hover:bg-slate-800 hover:text-blue-500 transition-all text-slate-400 border border-slate-700 hover:border-blue-500/50 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20 group">
                                <Facebook size={24} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </Section>

            <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900 bg-slate-950">
                <p>© {new Date().getFullYear()} Duong Quoc Vinh. Built with Next.js, Tailwind & Framer Motion.</p>
            </footer>

            {/* Certificate Modal */}
            {selectedCert && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm" onClick={() => setSelectedCert(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50">
                            <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-8 flex items-center justify-center">
                            {selectedCert.imageUrl ? (
                                <img src={selectedCert.imageUrl} alt={selectedCert.title} className="max-w-full max-h-full object-contain rounded shadow-lg" />
                            ) : (
                                <div className="flex flex-col items-center text-slate-600 gap-4">
                                    <Award size={64} className="opacity-20" />
                                    <p>No image available for this certificate.</p>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center">
                            <span className="text-sm text-slate-400">Issued by {selectedCert.issuer}</span>
                            <a href={selectedCert.verifyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-medium transition-colors text-sm">
                                Verify Credential <ExternalLink size={16} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
