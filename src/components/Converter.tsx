
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { preetiToUnicode } from '@/utils/preetiToUnicode';
import { unicodeToPreeti } from '@/utils/unicodeToPreeti';
import { Button } from '@/components/ui/button';
import { Clipboard, Check, RefreshCcw, Sparkles, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

enum ConversionMode {
  PREETI_TO_UNICODE = 'preeti-to-unicode',
  UNICODE_TO_PREETI = 'unicode-to-preeti',
  AUTO_DETECT = 'auto-detect'
}

const Converter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<ConversionMode>(ConversionMode.AUTO_DETECT);
  const [detectedMode, setDetectedMode] = useState<ConversionMode | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (mode === ConversionMode.AUTO_DETECT && inputText) {
      const detectedType = detectTextType(inputText);
      setDetectedMode(detectedType);
      convertText(inputText, detectedType);
    } else if (inputText) {
      setDetectedMode(null);
      convertText(inputText, mode);
    } else {
      setOutputText('');
      setSuggestions([]);
    }
  }, [inputText, mode]);
  
  const detectTextType = (text: string): ConversionMode => {
    const preetiPattern = /[cfOkmaevnz;xsI]/;
    const preetiSpecificCombos = /(cf]|O{|pm|kf|df)/;
    const unicodePattern = /[\u0900-\u097F]/;
    
    if (preetiPattern.test(text) && preetiSpecificCombos.test(text) && !unicodePattern.test(text)) {
      return ConversionMode.PREETI_TO_UNICODE;
    } else if (unicodePattern.test(text)) {
      return ConversionMode.UNICODE_TO_PREETI;
    }
    
    return ConversionMode.PREETI_TO_UNICODE; // Default to Preeti to Unicode
  };
  
  const convertText = (text: string, conversionMode: ConversionMode) => {
    try {
      let result = '';
      
      switch (conversionMode) {
        case ConversionMode.PREETI_TO_UNICODE:
          result = preetiToUnicode(text);
          generatePreetiSuggestions(text);
          break;
        case ConversionMode.UNICODE_TO_PREETI:
          result = unicodeToPreeti(text);
          setSuggestions([]);
          break;
        case ConversionMode.AUTO_DETECT:
          // Auto-detect now only switches between Preeti and Unicode
          if (detectTextType(text) === ConversionMode.PREETI_TO_UNICODE) {
            result = preetiToUnicode(text);
            generatePreetiSuggestions(text);
          } else {
            result = unicodeToPreeti(text);
            setSuggestions([]);
          }
          break;
      }
      
      setOutputText(result);
    } catch (err) {
      console.error("Error in conversion:", err);
      setOutputText('Error in conversion. Please check your input.');
      setSuggestions([]);
    }
  };
  
  const generatePreetiSuggestions = (text: string) => {
    const suggestions: string[] = [];
    
    if (text.includes('f') && !text.includes('cf')) {
      suggestions.push('Tip: "f" is often used with "c" to make "cf" for "आ"');
    }
    
    if (text.includes('ff')) {
      suggestions.push('Tip: Double "ff" is uncommon in Preeti, check your typing');
    }
    
    setSuggestions(suggestions);
  };
  
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
    setSuggestions([]);
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
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button
              variant={mode === ConversionMode.AUTO_DETECT ? "default" : "outline"}
              onClick={() => setMode(ConversionMode.AUTO_DETECT)}
              className={`rounded-full px-4 py-2 ${
                mode === ConversionMode.AUTO_DETECT ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' : ''
              }`}
            >
              <Sparkles size={16} className="mr-2" />
              Smart Detect
            </Button>
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
          </div>
          
          {mode === ConversionMode.AUTO_DETECT && detectedMode && inputText && (
            <div className="flex items-center justify-center mb-4 text-sm text-amber-400">
              <Sparkles size={16} className="mr-2" />
              <span>
                Detected: {
                  detectedMode === ConversionMode.PREETI_TO_UNICODE ? 'Preeti Text' :
                  detectedMode === ConversionMode.UNICODE_TO_PREETI ? 'Unicode Nepali' :
                  'Preeti Text' // Default to Preeti Text
                }
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="inputText" className="block text-sm font-medium text-gray-400">
                {mode === ConversionMode.PREETI_TO_UNICODE && "Preeti Text"}
                {mode === ConversionMode.UNICODE_TO_PREETI && "Unicode Nepali"}
                {mode === ConversionMode.AUTO_DETECT && "Input Text (Auto-Detect)"}
              </label>
              <Textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`w-full h-60 p-4 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent ${
                  mode === ConversionMode.PREETI_TO_UNICODE || 
                  (mode === ConversionMode.AUTO_DETECT && detectedMode === ConversionMode.PREETI_TO_UNICODE) 
                    ? 'font-preeti text-lg' : ''
                }`}
                placeholder={
                  mode === ConversionMode.AUTO_DETECT 
                    ? "Type or paste text (Preeti or Unicode)..." 
                    : mode === ConversionMode.PREETI_TO_UNICODE 
                    ? "Paste Preeti text here..." 
                    : "Paste Unicode Nepali text here..."
                }
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="outputText" className="block text-sm font-medium text-gray-400">
                  {mode === ConversionMode.PREETI_TO_UNICODE || 
                   (mode === ConversionMode.AUTO_DETECT && detectedMode === ConversionMode.PREETI_TO_UNICODE) 
                    ? "Unicode Nepali" 
                    : "Preeti Text"}
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
                  mode === ConversionMode.UNICODE_TO_PREETI || 
                  (mode === ConversionMode.AUTO_DETECT && detectedMode === ConversionMode.UNICODE_TO_PREETI) 
                    ? 'font-preeti text-xl leading-relaxed' : ''
                }`}
              >
                {outputText || (
                  <span className="text-gray-500 italic">
                    {mode === ConversionMode.AUTO_DETECT 
                      ? "Converted text will appear here..." 
                      : mode === ConversionMode.PREETI_TO_UNICODE 
                      ? "Unicode Nepali text will appear here..." 
                      : "Preeti text will appear here..."}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {suggestions.length > 0 && (
            <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-amber-700/30">
              <div className="flex items-center text-amber-400 mb-2">
                <Sparkles size={16} className="mr-2" />
                <h3 className="text-sm font-medium">Smart Suggestions</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 border-amber-600/30 hover:bg-amber-900/30 text-amber-300 text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 text-sm text-center text-gray-500">
            <p>
              {mode === ConversionMode.AUTO_DETECT 
                ? "Smart detection automatically identifies and converts between Preeti and Unicode formats." 
                : mode === ConversionMode.PREETI_TO_UNICODE 
                ? "Convert traditional Preeti font text to modern Unicode Nepali." 
                : "Convert Unicode Nepali to traditional Preeti font text."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Converter;
