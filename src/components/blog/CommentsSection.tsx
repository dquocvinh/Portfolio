import React from 'react';
import Giscus from '@giscus/react';
import { MessageSquare } from 'lucide-react';

interface CommentsSectionProps {
  postSlug: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ postSlug }) => {
  React.useEffect(() => {
    if (postSlug) {
      sessionStorage.setItem('giscus_last_slug', postSlug);
    }
  }, [postSlug]);

  return (
    <section className="mt-16 pt-12 border-t border-sand-100">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-5 h-5 text-coffee-600" />
        <h3 className="font-display text-2xl font-bold text-espresso-100">
          Comments & Discussion
        </h3>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-sand-100 p-6 rounded-2xl shadow-sm">
        <Giscus
          id="comments"
          repo="dquocvinh/Portfolio"
          repoId="R_kgDOTjMV0Q"
          category="Announcements"
          categoryId="DIC_kwDOTjMV0c4DFvYw"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="light"
          lang="vi"
          loading="lazy"
        />
      </div>
    </section>
  );
};

