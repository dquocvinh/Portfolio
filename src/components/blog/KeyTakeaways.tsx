import React from 'react';

interface KeyTakeawaysProps {
  takeaways: string[];
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways }) => {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="my-16 p-8 md:p-10 bg-cream-50 border border-sand-100">
      <h3 className="font-display text-2xl font-bold text-espresso-100 mb-8 uppercase tracking-widest text-center">
        Key Takeaways
      </h3>
      <div className="space-y-6">
        {takeaways.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <span className="font-mono text-coffee-300 font-bold text-lg leading-none shrink-0 mt-0.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-body text-espresso-100/90 text-lg leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
