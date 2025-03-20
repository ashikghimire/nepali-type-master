
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getRandomText, getRandomLongText, getRandomExtendedText } from '@/utils/textSamples';
import { calculateWPM, calculateAccuracy, processUserInput, formatTime } from '@/utils/typingUtils';
import { cn } from '@/lib/utils';
import Stats from './Stats';
import { preetiToUnicode } from '@/utils/preetiToUnicode';
import { Clock, BookOpen, RefreshCw } from 'lucide-react';

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
  const [showFinalScore, setShowFinalScore] = useState<boolean>(false);
  
  // Live Nepali conversion preview
  const [liveNepaliPreview, setLiveNepaliPreview] = useState<string>('');
  
  // Text mode (short, long practice)
  const [textMode, setTextMode] = useState<'short' | 'long' | 'extended'>('short');
  
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
    setLiveNepaliPreview('');
    
    // Get a new random text sample based on the selected mode
    if (textMode === 'long') {
      setCurrentText(getRandomLongText());
    } else if (textMode === 'extended') {
      setCurrentText(getRandomExtendedText());
    } else {
      setCurrentText(getRandomText());
    }
    
    // Clear any existing timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [textMode]);
  
  // Change text mode and reload
  const changeTextMode = (mode: 'short' | 'long' | 'extended') => {
    setTextMode(mode);
    // This will trigger the useEffect to reload with new text type
  };
  
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

    // Generate live Nepali preview of what the user is typing
    try {
      const nepaliPreview = preetiToUnicode(value);
      setLiveNepaliPreview(nepaliPreview);
    } catch (err) {
      console.error("Error converting Preeti to Unicode:", err);
      setLiveNepaliPreview('Conversion error');
    }
    
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
      
      // Get next text based on mode
      if (textMode === 'long') {
        setCurrentText(getRandomLongText());
      } else if (textMode === 'extended') {
        setCurrentText(getRandomExtendedText());
      } else {
        setCurrentText(getRandomText());
      }
      
      setLiveNepaliPreview('');
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
  
  // Start a new test on component mount or text mode change
  useEffect(() => {
    startNewTest();
    
    return () => {
      // Clean up timer on unmount
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [startNewTest, textMode]);
  
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
      <div className="mb-6">
        <Stats 
          wpm={wpm} 
          accuracy={accuracy} 
          time={formatTime(timeElapsed)} 
        />
      </div>
      
      <div className="mb-6 flex justify-center flex-wrap gap-2">
        <button
          onClick={() => changeTextMode('short')}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            textMode === 'short' 
              ? 'bg-primary text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <RefreshCw size={16} /> Short Text
        </button>
        <button
          onClick={() => changeTextMode('long')}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            textMode === 'long' 
              ? 'bg-primary text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <BookOpen size={16} /> 200+ Words
        </button>
        <button
          onClick={() => changeTextMode('extended')}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            textMode === 'extended' 
              ? 'bg-primary text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Clock size={16} /> Extended Practice
        </button>
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
              {textMode === 'short' ? 'Short Text Practice' : 
               textMode === 'long' ? '200+ Words Long Text Practice' : 
               'Extended Practice (1000+ Texts)'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Unicode Format */}
            <div className="space-y-2">
              <h3 className="text-gray-300 mb-2 text-left">Unicode (नेपाली):</h3>
              <div className="text-lg md:text-2xl leading-relaxed tracking-wide text-gray-400 dark:text-gray-400 mb-4 min-h-[120px] text-left overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-600">
                {renderText(unicodeText, false)}
                <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-caret-blink"></span>
              </div>
            </div>

            {/* Preeti Format */}
            <div className="space-y-2">
              <h3 className="text-gray-300 mb-2 text-left">Preeti:</h3>
              <div className="text-lg md:text-2xl leading-relaxed tracking-wide text-gray-400 dark:text-gray-400 mb-4 min-h-[120px] font-mono text-left overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-600">
                {renderText(preetiText, true)}
              </div>
            </div>
          </div>
          
          {/* Live Nepali Preview of Preeti Input */}
          {userInput.length > 0 && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-gray-300 mb-2 text-left">Your Nepali Text:</h3>
              <div className="text-lg md:text-xl leading-relaxed tracking-wide text-gray-300 mb-2 min-h-[40px]">
                {liveNepaliPreview}
              </div>
              <div className="text-xs text-gray-500 text-left">
                Live Unicode conversion of your input
              </div>
            </div>
          )}
          
          <div className="text-center text-xs text-gray-500 dark:text-gray-500 mb-2 mt-4">
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
