
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsProps {
  wpm: number;
  accuracy: number;
  time: string;
  className?: string;
}

const Stats: React.FC<StatsProps> = ({ wpm, accuracy, time, className }) => {
  return (
    <div className={cn("flex justify-center gap-8 py-6", className)}>
      <div className="flex flex-col items-center">
        <motion.span 
          className="text-3xl font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {wpm}
        </motion.span>
        <span className="text-xs text-muted-foreground mt-1">WPM</span>
      </div>
      
      <div className="flex flex-col items-center">
        <motion.span 
          className="text-3xl font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {accuracy}%
        </motion.span>
        <span className="text-xs text-muted-foreground mt-1">accuracy</span>
      </div>
      
      <div className="flex flex-col items-center">
        <motion.span 
          className="text-3xl font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {time}
        </motion.span>
        <span className="text-xs text-muted-foreground mt-1">time</span>
      </div>
    </div>
  );
};

export default Stats;
