
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import TypingTest from '@/components/TypingTest';
import EnglishTypingTest from '@/components/EnglishTypingTest';
import Converter from '@/components/Converter';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Keyboard, Repeat, Languages, Database } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'nepali' | 'english' | 'converter'>('nepali');

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 dark:bg-gray-900 text-gray-300 dark:text-gray-300 transition-colors duration-300">
      <Helmet>
        <title>AshikGhimire Typing Test | Nepali Typing Practice</title>
        <meta name="description" content="Practice typing in Nepali and English with AshikGhimire Typing Test. Choose from 1000+ texts and 200+ word passages for extended practice. Convert between Unicode and Preeti formats." />
        <meta name="keywords" content="nepali typing, typing test, nepali keyboard, preeti converter, unicode converter, 1000 text practice, 200 word practice" />
        <meta property="og:title" content="AshikGhimire Typing Test" />
        <meta property="og:description" content="Improve your Nepali and English typing skills with our free online typing test. Choose from over 1000 practice texts." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AshikGhimire Typing Test" />
        <meta name="twitter:description" content="Improve your Nepali and English typing skills with our free online typing test. Choose from over 1000 practice texts." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.div 
          className="w-full max-w-screen-lg mb-8 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            नेपाली टाइपिङ प्रशिक्षण
          </h1>
          <p className="text-gray-400 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-4">
            Practice typing in Nepali and English with Unicode and Preeti formats
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs md:text-sm max-w-lg mx-auto mb-8">
            Now with 1000+ practice texts and 200+ word passages for extended practice!
          </p>
          
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button 
              onClick={() => setActiveTab('nepali')} 
              className={`tab-button ${activeTab === 'nepali' ? 'gradient-purple text-white active font-medium shadow-lg' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'} rounded-full flex items-center gap-2 px-5 py-2.5 button-hover-effect`}
            >
              <Keyboard size={18} /> Nepali Typing
            </button>
            <button 
              onClick={() => setActiveTab('english')} 
              className={`tab-button ${activeTab === 'english' ? 'gradient-blue text-white active font-medium shadow-lg' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'} rounded-full flex items-center gap-2 px-5 py-2.5 button-hover-effect`}
            >
              <Languages size={18} /> English Typing
            </button>
            <button 
              onClick={() => setActiveTab('converter')} 
              className={`tab-button ${activeTab === 'converter' ? 'gradient-purple text-white active font-medium shadow-lg' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'} rounded-full flex items-center gap-2 px-5 py-2.5 button-hover-effect`}
            >
              <Repeat size={18} /> Text Converter
            </button>
          </div>
        </motion.div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {activeTab === 'nepali' && (
            <>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Database size={16} />
                  <span className="text-sm font-medium">1000+ Text Samples</span>
                </div>
              </div>
              <TypingTest />
            </>
          )}
          {activeTab === 'english' && <EnglishTypingTest />}
          {activeTab === 'converter' && <Converter />}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
