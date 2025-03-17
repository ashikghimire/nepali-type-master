
import React from 'react';
import Header from '@/components/Header';
import TypingTest from '@/components/TypingTest';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
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
            नेपाली टाइपिङ टेस्ट
          </h1>
          <p className="text-gray-400 dark:text-gray-400 text-sm max-w-2xl mx-auto">
            Improve your Nepali typing speed in Preeti font format
          </p>
          <div className="mt-4 text-gray-400 text-sm">
            <p>Practice typing common Nepali phrases and sentences</p>
          </div>
        </motion.div>
        
        <TypingTest />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
