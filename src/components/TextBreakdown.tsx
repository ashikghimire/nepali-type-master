
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { educationText } from '@/utils/textSamples';

const TextBreakdown: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState<'unicode' | 'preeti'>('unicode');
  const [expandedParagraph, setExpandedParagraph] = useState<number | null>(null);

  const toggleFormat = () => {
    setActiveFormat(activeFormat === 'unicode' ? 'preeti' : 'unicode');
  };

  const toggleExpand = (index: number) => {
    setExpandedParagraph(expandedParagraph === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-4 text-primary">
          {activeFormat === 'unicode' ? educationText.title : "lzIff: dfgj ;Eotfsf] d]?b08"}
        </h1>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleFormat}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-opacity-90 transition-all"
          >
            {activeFormat === 'unicode' ? 'Show in Preeti' : 'Show in Unicode'}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Click on paragraphs to expand and see a character-by-character breakdown
        </p>
      </motion.div>

      <div className="space-y-6">
        {(activeFormat === 'unicode' ? educationText.unicode : educationText.preeti).map((paragraph, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <p className={activeFormat === 'preeti' ? "font-preeti text-lg leading-relaxed" : "text-lg leading-relaxed"}>
                {paragraph}
              </p>
            </div>
            
            {expandedParagraph === index && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 dark:bg-gray-700 p-4 border-t border-gray-700"
              >
                <h3 className="text-sm font-medium mb-3 text-gray-300">Character Breakdown:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {paragraph.split('').map((char, charIndex) => (
                    <div 
                      key={charIndex}
                      className="bg-gray-700 dark:bg-gray-600 p-2 rounded text-center"
                    >
                      <div className={`text-xl ${activeFormat === 'preeti' ? "font-preeti" : ""}`}>
                        {char}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Character {charIndex + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TextBreakdown;
