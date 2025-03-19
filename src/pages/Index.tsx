
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import TypingTest from '@/components/TypingTest';
import TextBreakdown from '@/components/TextBreakdown';
import Converter from '@/components/Converter';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'typing' | 'breakdown' | 'converter'>('typing');

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 dark:bg-gray-900 text-gray-300 dark:text-gray-300 transition-colors duration-300">
      <Helmet>
        <title>AshikGhimire Typing Test | Nepali Typing Practice</title>
        <meta name="description" content="Improve your Nepali typing skills with AshikGhimire's typing test. Practice typing in Unicode, Preeti formats and convert between different Nepali text formats." />
        <meta name="keywords" content="nepali typing, typing test, ashikghimire, preeti typing, unicode typing, nepali converter, unicode to preeti, preeti to unicode, roman to nepali" />
        <meta name="author" content="Ashik Ghimire" />
        <meta property="og:title" content="AshikGhimire Typing Test - Nepali Typing Practice" />
        <meta property="og:description" content="Free online tool for practicing and improving your Nepali typing skills in both Unicode and Preeti formats." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashikghimire-typing.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AshikGhimire Typing Test" />
        <meta name="twitter:description" content="Practice typing in Nepali with both Unicode and Preeti formats. Free online Nepali typing test tool." />
        <link rel="canonical" href="https://ashikghimire-typing.com" />
      </Helmet>
      
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
          
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button 
              onClick={() => setActiveTab('typing')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'typing' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Practice Typing
            </button>
            <button 
              onClick={() => setActiveTab('breakdown')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'breakdown' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Text Breakdown
            </button>
            <button 
              onClick={() => setActiveTab('converter')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'converter' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Text Converter
            </button>
          </div>
        </motion.div>
        
        {activeTab === 'typing' && <TypingTest />}
        {activeTab === 'breakdown' && <TextBreakdown />}
        {activeTab === 'converter' && <Converter />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
