
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getRandomText } from '@/utils/textSamples';
import { calculateWPM, calculateAccuracy, processUserInput, formatTime } from '@/utils/typingUtils';
import { cn } from '@/lib/utils';
import Stats from './Stats';

interface TypingTestProps {
  className?: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ className }) => {
  // Test text and user input
  const [targetText, setTargetText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  
  // Timer state
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const timerIntervalRef = useRef<number | null>(null);
  
  // Stats
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  
  // References
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Start a new test with random text
  const startNewTest = useCallback(() => {
    const text = getRandomText();
    setTargetText(text);
    setUserInput('');
    setIsTestActive(false);
    setIsTestComplete(false);
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
    
    // Clear any existing timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Start the timer when test becomes active
  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) return;
    
    timerIntervalRef.current = window.setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  }, []);
  
  // Handle user input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Start the test when user begins typing
    if (!isTestActive && value.length > 0) {
      setIsTestActive(true);
      startTimer();
    }
    
    setUserInput(value);
    
    // Process the input to calculate stats
    const { correctChars, errorChars } = processUserInput(targetText, value);
    const totalChars = value.length;
    
    // Update stats
    setWpm(calculateWPM(correctChars, timeElapsed));
    setAccuracy(calculateAccuracy(correctChars, totalChars));
    
    // Check if test is complete
    if (value.length >= targetText.length) {
      endTest();
    }
  };
  
  // End the current test
  const endTest = () => {
    setIsTestActive(false);
    setIsTestComplete(true);
    
    // Stop the timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };
  
  // Start a new test on component mount
  useEffect(() => {
    startNewTest();
    
    return () => {
      // Clean up timer on unmount
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [startNewTest]);
  
  // Render characters with correct/incorrect highlighting
  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let className = 'text-muted-foreground';
      
      if (index < userInput.length) {
        // Character has been typed
        className = userInput[index] === char 
          ? 'text-foreground' 
          : 'text-red-500 bg-red-50';
      } else if (index === userInput.length) {
        // Current character (cursor position)
        className = 'text-foreground bg-gray-100 animate-pulse-subtle';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };
  
  return (
    <div className={cn("w-full max-w-screen-lg mx-auto px-4", className)}>
      <div className="mb-8">
        <Stats 
          wpm={wpm} 
          accuracy={accuracy} 
          time={formatTime(timeElapsed)} 
        />
      </div>
      
      <motion.div 
        className="relative bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-8 shadow-sm mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl leading-relaxed font-preeti mb-12 tracking-wide">
          {renderText()}
          <span className="inline-block w-0.5 h-5 bg-foreground ml-0.5 animate-caret-blink"></span>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-muted-foreground mb-1">Current typing:</p>
          <div className="text-xl font-preeti text-foreground">
            {userInput}
            <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-caret-blink"></span>
          </div>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInput}
          className="opacity-0 absolute inset-0 w-full h-full cursor-default"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </motion.div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={startNewTest}
          className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200"
        >
          {isTestComplete ? 'Try Again' : 'New Test'}
        </button>
      </div>
    </div>
  );
};

export default TypingTest;
