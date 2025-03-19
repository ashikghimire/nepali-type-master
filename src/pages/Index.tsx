
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import TypingTest from '@/components/TypingTest';
import TextBreakdown from '@/components/TextBreakdown';
import Converter from '@/components/Converter';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Sparkles, Keyboard, FileText, Repeat } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'typing' | 'breakdown' | 'converter'>('typing');

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 dark:bg-gray-900 text-gray-300 dark:text-gray-300 transition-colors duration-300">
      <Helmet>
        <title>AshikGhimire Typing Test | Nepali Typing Practice</title>
        
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
          <p className="text-gray-400 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Practice typing Nepali with both Unicode and Preeti formats
          </p>
          
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button 
              onClick={() => setActiveTab('typing')} 
              className={`tab-button ${activeTab === 'typing' ? 'gradient-purple text-white active font-medium shadow-lg' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'} rounded-full flex items-center gap-2 px-5 py-2.5 button-hover-effect`}
            >
              <Keyboard size={18} /> Practice Typing
            </button>
            <button 
              onClick={() => setActiveTab('breakdown')} 
              className={`tab-button ${activeTab === 'breakdown' ? 'gradient-blue text-white active font-medium shadow-lg' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'} rounded-full flex items-center gap-2 px-5 py-2.5 button-hover-effect`}
            >
              <FileText size={18} /> Text Breakdown
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
          {activeTab === 'typing' && <TypingTest />}
          {activeTab === 'breakdown' && <TextBreakdown />}
          {activeTab === 'converter' && <Converter />}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
