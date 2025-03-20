
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import TypingTest from '@/components/TypingTest';
import EnglishTypingTest from '@/components/EnglishTypingTest';
import Converter from '@/components/Converter';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Keyboard, Repeat, Languages, Database, Sparkles, Clock, Award, ChevronRight, Book, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'nepali' | 'english' | 'converter'>('nepali');
  const [showFeatures, setShowFeatures] = useState(false);

  const features = [
    {
      icon: <Keyboard size={20} />,
      title: 'Nepali Typing Practice',
      description: 'Practice typing in Nepali with Unicode format',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <Languages size={20} />,
      title: 'English Typing Test',
      description: 'Improve your English typing speed and accuracy',
      gradient: 'from-blue-500 to-teal-400'
    },
    {
      icon: <Repeat size={20} />,
      title: 'Text Converter',
      description: 'Convert between Unicode and Preeti formats easily',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: <Database size={20} />,
      title: '1000+ Practice Texts',
      description: 'Choose from a vast library of practice content',
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      icon: <Sparkles size={20} />,
      title: 'Smart Detection',
      description: 'Automatic detection of text formats',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: <BarChart size={20} />,
      title: 'Performance Analytics',
      description: 'Track your typing speed and accuracy over time',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

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
          <p className="text-gray-400 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-2">
            Practice typing in Nepali and English with Unicode and Preeti formats
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs md:text-sm max-w-lg mx-auto mb-6">
            Now with 1000+ practice texts and 200+ word passages for extended practice!
          </p>
          
          <Button 
            onClick={() => setShowFeatures(!showFeatures)}
            className="mb-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full px-5 py-2 flex items-center mx-auto gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <Sparkles size={16} /> 
            {showFeatures ? 'Hide Features' : 'Explore Features'}
            <ChevronRight size={16} className={`transition-transform duration-300 ${showFeatures ? 'rotate-90' : ''}`} />
          </Button>

          {showFeatures && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-5 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:translate-y-[-4px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
          
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
