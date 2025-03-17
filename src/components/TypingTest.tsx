
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
  // Get random text
  const [currentText, setCurrentText] = useState(getRandomText());
  
  // Test text and user input
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
  
  // Format to display (unicode or preeti)
  const [displayFormat, setDisplayFormat] = useState<'unicode' | 'preeti'>('preeti');
  
  // Change the display format
  const toggleDisplayFormat = () => {
    setDisplayFormat(prev => prev === 'unicode' ? 'preeti' : 'unicode');
  };
  
  // Start a new test with random text
  const startNewTest = useCallback(() => {
    // Reset all test stats
    setUserInput('');
    setIsTestActive(false);
    setIsTestComplete(false);
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
    
    // Get a new random text sample
    setCurrentText(getRandomText());
    
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
    
    // Get the target text based on the current display format
    const targetText = displayFormat === 'unicode' ? currentText.unicode : currentText.preeti;
    
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
  
  // Get the current target text based on display format
  const targetText = displayFormat === 'unicode' ? currentText.unicode : currentText.preeti;
  
  // Render characters with correct/incorrect highlighting
  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let className = 'text-muted-foreground';
      
      if (index < userInput.length) {
        // Character has been typed
        className = userInput[index] === char 
          ? 'text-foreground' 
          : 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
      } else if (index === userInput.length) {
        // Current character (cursor position)
        className = 'text-foreground bg-gray-100 dark:bg-gray-700 animate-pulse-subtle';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };
  
  return (
    <div className={cn("w-full max-w-screen-lg mx-auto px-4 typing-test-container", className)}>
      <div className="mb-8">
        <Stats 
          wpm={wpm} 
          accuracy={accuracy} 
          time={formatTime(timeElapsed)} 
        />
      </div>
      
      <motion.div 
        className="relative text-center bg-gray-900 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8 typing-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 dark:text-gray-400 text-sm">
            Nepali Typing Practice
          </span>
          <button 
            onClick={toggleDisplayFormat}
            className="px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs transition-colors"
          >
            {displayFormat === 'unicode' ? 'Use Preeti' : 'Use Unicode'}
          </button>
        </div>
        
        <div className={cn(
          "text-lg md:text-2xl leading-relaxed tracking-wide text-gray-400 dark:text-gray-400 mb-4 min-h-[120px]",
          "font-preeti"
        )}>
          {renderText()}
          <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-caret-blink"></span>
        </div>
        
        <div className="mb-4">
          <h3 className="text-gray-300 mb-2 text-left">Translation:</h3>
          <div className="text-gray-400 text-left">
            {displayFormat === 'unicode' ? (
              <span className="font-preeti">{currentText.preeti}</span>
            ) : (
              <span>{currentText.unicode}</span>
            )}
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 dark:text-gray-500 mb-2">
          <span className="text-gray-400 dark:text-gray-400">{userInput.length}</span>
          <span> / </span>
          <span>{targetText.length}</span>
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
          {isTestComplete ? 'Try Again' : 'New Text'}
        </button>
      </div>
    </div>
  );
};

export default TypingTest;
