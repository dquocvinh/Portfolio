import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink, Award, FileText } from 'lucide-react';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
import { CertificateModal } from './CertificateModal';
import certificatesData from '../data/certificates.json';
import type { Certificate } from '../types';

// Vite-specific: Prepend the base URL to root-relative asset paths
// This ensures that assets from the `public` directory work correctly
// both in development (with a base path) and in production.
const BASE_URL = import.meta.env.BASE_URL;
const CERT_BG = `${BASE_URL}hero_image1.png`;

const certificates = certificatesData.map(cert => ({
  ...cert,
  imageUrl: cert.imageUrl.startsWith('/') && !cert.imageUrl.startsWith('//') ? `${BASE_URL}${cert.imageUrl.substring(1)}` : cert.imageUrl,
})) as Certificate[];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <Section
      id="certificates"
      style={{ backgroundImage: `url(${CERT_BG})` }}
    >
      <SectionTitle subtitle="Professional certifications and achievements">Certificates</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        {certificates.length > 0 ? (
          certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl border border-sand-100 hover:border-coffee-300/40 hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col"
            >
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative h-48 bg-cream-50 block overflow-hidden cursor-pointer"
              >
                {cert.imageUrl ? (
                  cert.imageUrl.endsWith('.pdf') ? (
                    <div className="w-full h-full relative group overflow-hidden border-b border-sand-100/60">
                      <iframe
                        src={`${cert.imageUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        title={cert.title}
                        className="w-full h-full border-none pointer-events-none scale-100"
                      />
                      <div className="absolute inset-0 bg-espresso-100/10 group-hover:bg-espresso-100/0 transition-colors" />
                    </div>
                  ) : (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cream-100 to-sand-100 flex flex-col items-center justify-center p-6 relative overflow-hidden border-b border-sand-100/60">
                    <Award className="absolute -right-6 -bottom-6 w-36 h-36 text-coffee-300/10 transform -rotate-12 pointer-events-none" />
                    <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-sm border border-sand-100 flex items-center justify-center text-coffee-300 mb-2">
                      <Award size={28} />
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-taupe-200 uppercase">{cert.issuer}</span>
                  </div>
                )}

                <span className="absolute top-3 right-3 bg-white/90 text-coffee-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md border border-sand-100 shadow-sm z-10 font-medium">
                  <CheckCircle size={12} className="text-gold-300" /> Verified
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-xl font-bold text-espresso-100 group-hover:text-coffee-300 transition-colors font-display">
                    {cert.title}
                  </h3>
                  <span className="text-xs font-mono text-taupe-200 border border-sand-100 px-2 py-1 rounded bg-cream-50 shrink-0">
                    {cert.date}
                  </span>
                </div>
                <div className="text-coffee-300/80 text-sm font-medium mb-4">{cert.issuer}</div>
                <p className="text-taupe-200 leading-relaxed text-sm mb-4">{cert.desc}</p>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto text-sm text-taupe-200 hover:text-espresso-100 inline-flex items-center gap-1 transition-colors"
                >
                  Verify Credential <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="bg-white/50 rounded-2xl border border-sand-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-sand-100"></div>
              <div className="p-6">
                <div className="h-6 bg-sand-100 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-sand-100 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-sand-100 rounded w-full mb-4"></div>
                <div className="h-4 bg-sand-100 rounded w-1/3"></div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </Section>
  );
};

export default Certificates;