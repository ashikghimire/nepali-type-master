
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { preetiToUnicode } from '@/utils/preetiToUnicode';
import { unicodeToPreeti } from '@/utils/unicodeToPreeti';
import { romanToNepaliUnicode } from '@/utils/romanToNepaliUnicode';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

const Converter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [conversionType, setConversionType] = useState<'preetiToUnicode' | 'unicodeToPreeti' | 'romanToUnicode'>('preetiToUnicode');
  const [copied, setCopied] = useState(false);

  // Update the output text when the input or conversion type changes
  useEffect(() => {
    convertText();
  }, [inputText, conversionType]);

  const convertText = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    try {
      switch (conversionType) {
        case 'preetiToUnicode':
          setOutputText(preetiToUnicode(inputText));
          break;
        case 'unicodeToPreeti':
          setOutputText(unicodeToPreeti(inputText));
          break;
        case 'romanToUnicode':
          setOutputText(romanToNepaliUnicode(inputText));
          break;
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setOutputText('Error in conversion');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 dark:bg-gray-900 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-200">Nepali Text Converter</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={() => setConversionType('preetiToUnicode')}
            className={`px-4 py-2 ${conversionType === 'preetiToUnicode' ? 'bg-primary' : 'bg-gray-700'}`}
          >
            Preeti to Unicode
          </Button>
          <Button
            onClick={() => setConversionType('unicodeToPreeti')}
            className={`px-4 py-2 ${conversionType === 'unicodeToPreeti' ? 'bg-primary' : 'bg-gray-700'}`}
          >
            Unicode to Preeti
          </Button>
          <Button
            onClick={() => setConversionType('romanToUnicode')}
            className={`px-4 py-2 ${conversionType === 'romanToUnicode' ? 'bg-primary' : 'bg-gray-700'}`}
          >
            Roman to Unicode
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              {conversionType === 'preetiToUnicode' ? 'Preeti Text' : 
               conversionType === 'unicodeToPreeti' ? 'Unicode Text' : 'Roman Text'}
            </label>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              className={`w-full h-48 p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent ${
                conversionType === 'preetiToUnicode' ? 'font-preeti' : ''
              }`}
              placeholder={`Enter ${
                conversionType === 'preetiToUnicode' ? 'Preeti' : 
                conversionType === 'unicodeToPreeti' ? 'Unicode' : 'Roman'
              } text here...`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-400">
                {conversionType === 'preetiToUnicode' ? 'Unicode Text' : 
                conversionType === 'unicodeToPreeti' ? 'Preeti Text' : 'Unicode Nepali Text'}
              </label>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                disabled={!outputText}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-1">{copied ? 'Copied!' : 'Copy'}</span>
              </Button>
            </div>
            <textarea
              value={outputText}
              readOnly
              className={`w-full h-48 p-3 rounded-md bg-gray-800 text-white border border-gray-700 ${
                conversionType === 'unicodeToPreeti' ? 'font-preeti' : ''
              }`}
              placeholder="Converted text will appear here..."
            />
          </div>
        </div>
      </motion.div>

      <div className="mt-8 text-gray-500 text-sm">
        <p className="mb-2">Conversion Notes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Preeti to Unicode: Converts text from Preeti font format to Unicode Nepali.</li>
          <li>Unicode to Preeti: Converts Unicode Nepali text to Preeti font format.</li>
          <li>Roman to Unicode: Converts Roman transliteration to Unicode Nepali.</li>
        </ul>
      </div>
    </div>
  );
};

export default Converter;
