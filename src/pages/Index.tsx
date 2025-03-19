
import React, { useState } from 'react';
import Header from '@/components/Header';
import TypingTest from '@/components/TypingTest';
import TextBreakdown from '@/components/TextBreakdown';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 dark:bg-gray-900 text-gray-300 dark:text-gray-300 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div 
          className="w-full max-w-screen-lg mb-8 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-gray-200 dark:text-gray-200">
            नेपाली टाइपिङ प्रशिक्षण
          </h1>
          <p className="text-gray-400 dark:text-gray-400 text-sm max-w-2xl mx-auto">
            Practice typing Nepali with both Unicode and Preeti formats
          </p>
          
          <div className="mt-6 flex justify-center gap-4">
            <button 
              onClick={() => setShowBreakdown(false)} 
              className={`px-4 py-2 rounded-md ${!showBreakdown ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Practice Typing
            </button>
            <button 
              onClick={() => setShowBreakdown(true)} 
              className={`px-4 py-2 rounded-md ${showBreakdown ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Text Breakdown
            </button>
          </div>
        </motion.div>
        
        {showBreakdown ? <TextBreakdown /> : <TypingTest />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
