import React, { useEffect, useState } from 'react';

export const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Wait for content to render
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('.blog-prose h2, .blog-prose h3'));
      
      const headingData = elements.map((el) => {
        // Ensure elements have IDs
        if (!el.id) {
          el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase() === 'h2' ? 2 : 3,
        };
      });
      setHeadings(headingData);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const elements = document.querySelectorAll('.blog-prose h2, .blog-prose h3');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="text-[10px] font-bold text-taupe-300 uppercase tracking-widest mb-4">
        On This Page
      </h4>
      <ul className="space-y-2.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block transition-colors leading-snug ${
                activeId === heading.id
                  ? 'text-coffee-600 font-semibold'
                  : 'text-taupe-200 hover:text-espresso-100'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveId(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
