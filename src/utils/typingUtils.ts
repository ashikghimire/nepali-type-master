
// Calculate Words Per Minute
export const calculateWPM = (
  typedCharacters: number,
  timeElapsedInSeconds: number
): number => {
  // Standard calculation: 5 characters = 1 word
  const words = typedCharacters / 5;
  const minutes = timeElapsedInSeconds / 60;
  
  if (minutes === 0) return 0;
  
  // Return WPM rounded to nearest integer
  return Math.round(words / minutes);
};

// Calculate accuracy percentage
export const calculateAccuracy = (
  correctChars: number,
  totalChars: number
): number => {
  if (totalChars === 0) return 100;
  
  return Math.round((correctChars / totalChars) * 100);
};

// Process user input against target text
export const processUserInput = (
  targetText: string,
  userInput: string
): { correctChars: number; errorChars: number } => {
  let correctChars = 0;
  let errorChars = 0;
  
  // Compare each character
  for (let i = 0; i < userInput.length; i++) {
    if (i >= targetText.length) {
      // Extra characters typed
      errorChars++;
    } else if (userInput[i] === targetText[i]) {
      correctChars++;
    } else {
      errorChars++;
    }
  }
  
  return { correctChars, errorChars };
};

// Format time in MM:SS format
export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
