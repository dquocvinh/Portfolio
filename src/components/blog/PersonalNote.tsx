import React from 'react';

interface PersonalNoteProps {
  note: string;
}

export const PersonalNote: React.FC<PersonalNoteProps> = ({ note }) => {
  if (!note) return null;

  return (
    <div className="my-16 flex flex-col items-center text-center">
      <div className="w-12 h-px bg-sand-200 mb-8" />
      <h3 className="text-xs font-bold text-taupe-300 uppercase tracking-widest mb-6">
        A Personal Note
      </h3>
      <p className="font-display text-xl md:text-2xl italic text-espresso-100 leading-relaxed max-w-2xl mx-auto">
        "{note}"
      </p>
      <span className="mt-6 text-sm font-semibold text-taupe-200 uppercase tracking-widest">
        — Vinh
      </span>
      <div className="w-12 h-px bg-sand-200 mt-8" />
    </div>
  );
};
