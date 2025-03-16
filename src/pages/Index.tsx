
import React from 'react';
import Header from '@/components/Header';
import TypingTest from '@/components/TypingTest';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div 
          className="w-full max-w-screen-lg mb-12 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-medium tracking-tight mb-4">
            नेपाली टाइपिङ टेस्ट
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Improve your Nepali typing speed and accuracy with this elegant, minimalist 
            typing test. Practice with the Preeti font used in many Nepali documents.
          </p>
        </motion.div>
        
        <TypingTest />
        
        <motion.div 
          className="w-full max-w-screen-lg mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Improve Speed</h3>
              <p className="text-sm text-muted-foreground">
                Regular practice will help increase your Nepali typing speed
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Build Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Focus on precision to reduce errors in your typing
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your improvement with detailed statistics
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
