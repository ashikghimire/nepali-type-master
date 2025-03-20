
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { preetiToUnicode } from '@/utils/preetiToUnicode';
import { unicodeToPreeti } from '@/utils/unicodeToPreeti';
import { romanToNepaliUnicode } from '@/utils/romanToNepaliUnicode';
import { Button } from '@/components/ui/button';
import { Clipboard, Check, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

enum ConversionMode {
  PREETI_TO_UNICODE = 'preeti-to-unicode',
  UNICODE_TO_PREETI = 'unicode-to-preeti',
  ROMAN_TO_UNICODE = 'roman-to-unicode'
}

const Converter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<ConversionMode>(ConversionMode.PREETI_TO_UNICODE);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (inputText) {
      try {
        switch (mode) {
          case ConversionMode.PREETI_TO_UNICODE:
            setOutputText(preetiToUnicode(inputText));
            break;
          case ConversionMode.UNICODE_TO_PREETI:
            setOutputText(unicodeToPreeti(inputText));
            break;
          case ConversionMode.ROMAN_TO_UNICODE:
            setOutputText(romanToNepaliUnicode(inputText));
            break;
        }
      } catch (err) {
        console.error("Error in conversion:", err);
        setOutputText('Error in conversion. Please check your input.');
      }
    } else {
      setOutputText('');
    }
  }, [inputText, mode]);
  
  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
        .then(() => {
          setCopied(true);
          toast({
            title: "Copied!",
            description: "Text copied to clipboard",
            duration: 2000
          });
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          toast({
            title: "Error",
            description: "Failed to copy text",
            variant: "destructive"
          });
        });
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            नेपाली टेक्स्ट रूपान्तरण
          </h2>
          
          {/* Conversion Mode Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button
              variant={mode === ConversionMode.PREETI_TO_UNICODE ? "default" : "outline"}
              onClick={() => setMode(ConversionMode.PREETI_TO_UNICODE)}
              className={`rounded-full px-4 py-2 ${
                mode === ConversionMode.PREETI_TO_UNICODE ? 'gradient-purple text-white shadow-md' : ''
              }`}
            >
              Preeti → Unicode
            </Button>
            <Button
              variant={mode === ConversionMode.UNICODE_TO_PREETI ? "default" : "outline"}
              onClick={() => setMode(ConversionMode.UNICODE_TO_PREETI)}
              className={`rounded-full px-4 py-2 ${
                mode === ConversionMode.UNICODE_TO_PREETI ? 'gradient-blue text-white shadow-md' : ''
              }`}
            >
              Unicode → Preeti
            </Button>
            <Button
              variant={mode === ConversionMode.ROMAN_TO_UNICODE ? "default" : "outline"}
              onClick={() => setMode(ConversionMode.ROMAN_TO_UNICODE)}
              className={`rounded-full px-4 py-2 ${
                mode === ConversionMode.ROMAN_TO_UNICODE ? 'gradient-purple text-white shadow-md' : ''
              }`}
            >
              Roman → नेपाली
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Box */}
            <div className="space-y-2">
              <label htmlFor="inputText" className="block text-sm font-medium text-gray-400">
                {mode === ConversionMode.PREETI_TO_UNICODE && "Preeti Text"}
                {mode === ConversionMode.UNICODE_TO_PREETI && "Unicode Nepali"}
                {mode === ConversionMode.ROMAN_TO_UNICODE && "Roman Text"}
              </label>
              <textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`w-full h-60 p-4 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent ${
                  mode === ConversionMode.PREETI_TO_UNICODE ? 'font-preeti text-lg' : ''
                }`}
                placeholder={
                  mode === ConversionMode.PREETI_TO_UNICODE 
                    ? "Paste Preeti text here..." 
                    : mode === ConversionMode.UNICODE_TO_PREETI 
                    ? "Paste Unicode Nepali text here..." 
                    : "Type Roman text (e.g., namaste)..."
                }
              />
            </div>
            
            {/* Output Box */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="outputText" className="block text-sm font-medium text-gray-400">
                  {mode === ConversionMode.PREETI_TO_UNICODE && "Unicode Nepali"}
                  {mode === ConversionMode.UNICODE_TO_PREETI && "Preeti Text"}
                  {mode === ConversionMode.ROMAN_TO_UNICODE && "नेपाली Unicode"}
                </label>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClear} 
                    disabled={!inputText}
                    className="text-gray-400 hover:text-white"
                  >
                    <RefreshCcw size={16} />
                    <span className="ml-1">Clear</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopy} 
                    disabled={!outputText}
                    className="text-gray-400 hover:text-white"
                  >
                    {copied ? <Check size={16} /> : <Clipboard size={16} />}
                    <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
              </div>
              <div 
                id="outputText" 
                className={`w-full h-60 p-4 bg-gray-900 text-white rounded-lg border border-gray-700 overflow-auto ${
                  mode === ConversionMode.UNICODE_TO_PREETI ? 'font-preeti text-xl leading-relaxed' : ''
                }`}
              >
                {outputText || (
                  <span className="text-gray-500 italic">
                    {mode === ConversionMode.PREETI_TO_UNICODE 
                      ? "Unicode Nepali text will appear here..." 
                      : mode === ConversionMode.UNICODE_TO_PREETI 
                      ? "Preeti text will appear here..." 
                      : "Nepali text will appear here..."}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-center text-gray-500">
            <p>
              {mode === ConversionMode.PREETI_TO_UNICODE && "Convert traditional Preeti font text to modern Unicode Nepali."}
              {mode === ConversionMode.UNICODE_TO_PREETI && "Convert Unicode Nepali to traditional Preeti font text."}
              {mode === ConversionMode.ROMAN_TO_UNICODE && "Type in English and convert to Nepali Unicode. Example: 'namaste' → 'नमस्ते'"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Converter;
