import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getRandomText, getSpecificText } from '@/utils/textSamples';
import { calculateWPM, calculateAccuracy, processUserInput, formatTime } from '@/utils/typingUtils';
import { cn } from '@/lib/utils';
import Stats from './Stats';

interface TypingTestProps {
  className?: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ className }) => {
  // Get the specific Preeti instruction text first (the one at index 1)
  const [currentText, setCurrentText] = useState(getSpecificText(1));
  
  // Test text and user input
  const [userInput, setUserInput] = useState<string>('');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  const [showFinalScore, setShowFinalScore] = useState<boolean>(false);
  
  // Timer state
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const timerIntervalRef = useRef<number | null>(null);
  
  // Stats
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  
  // References
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Format to display (now fixed to unicode, with preeti translation)
  const [displayFormat, setDisplayFormat] = useState<'unicode'>('unicode');
  
  // Start a new test with random text
  const startNewTest = useCallback(() => {
    // Reset all test stats
    setUserInput('');
    setIsTestActive(false);
    setIsTestComplete(false);
    setShowFinalScore(false);
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
    
    // Get the target text based on the current display format (now unicode)
    const targetText = currentText.unicode;
    
    // Process the input to calculate stats
    const { correctChars, errorChars } = processUserInput(targetText, value);
    const totalChars = value.length;
    
    // Update stats
    setWpm(calculateWPM(correctChars, timeElapsed));
    setAccuracy(calculateAccuracy(correctChars, totalChars));
    
    // Check if test is complete
    if (value.length >= targetText.length) {
      completeCurrentText();
    }
  };
  
  // Complete current text and automatically proceed to next one
  const completeCurrentText = () => {
    // Small delay before showing the next text
    setTimeout(() => {
      setUserInput('');
      setCurrentText(getRandomText());
    }, 500);
  };
  
  // End the current test and show final score
  const endTest = () => {
    setIsTestActive(false);
    setIsTestComplete(true);
    setShowFinalScore(true);
    
    // Stop the timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };
  
  // Start a new test on component mount
  useEffect(() => {
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    return () => {
      // Clean up timer on unmount
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);
  
  // Get the current target texts
  const unicodeText = currentText.unicode;
  const preetiText = currentText.preeti;
  
  // Calculate highlights for both formats
  const highlightedChars = Math.min(userInput.length, unicodeText.length);
  
  // Render characters with correct/incorrect highlighting for both formats
  const renderText = (text: string, isPreeti: boolean) => {
    return text.split('').map((char, index) => {
      let className = 'text-muted-foreground';
      
      if (index < userInput.length) {
        // Character has been typed
        className = userInput[index] === (isPreeti ? preetiText[index] : unicodeText[index])
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
      
      {showFinalScore ? (
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">Your Final Score</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary">{wpm}</div>
              <div className="text-sm text-gray-400">Words Per Minute</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary">{accuracy}%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-gray-400">Time Elapsed</div>
            </div>
          </div>
          <button
            onClick={startNewTest}
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200"
          >
            Try Again
          </button>
        </motion.div>
      ) : (
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Unicode Format */}
            <div className="space-y-2">
              <h3 className="text-gray-300 mb-2 text-left">Unicode (नेपाली):</h3>
              <div className="text-lg md:text-2xl leading-relaxed tracking-wide text-gray-400 dark:text-gray-400 mb-4 min-h-[120px]">
                {renderText(unicodeText, false)}
                <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-caret-blink"></span>
              </div>
            </div>

            {/* Preeti Format */}
            <div className="space-y-2">
              <h3 className="text-gray-300 mb-2 text-left">Preeti (Roman):</h3>
              <div className="text-lg md:text-2xl leading-relaxed tracking-wide text-gray-400 dark:text-gray-400 mb-4 min-h-[120px] font-preeti">
                {renderText(preetiText, true)}
              </div>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-500 dark:text-gray-500 mb-2">
            <span className="text-gray-400 dark:text-gray-400">{userInput.length}</span>
            <span> / </span>
            <span>{unicodeText.length}</span>
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
      )}
      
      <div className="flex justify-center gap-4">
        {isTestActive && !showFinalScore && (
          <button
            onClick={endTest}
            className="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
          >
            Stop & View Score
          </button>
        )}
        {!isTestActive && !showFinalScore && (
          <button
            onClick={startNewTest}
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200"
          >
            New Text
          </button>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
