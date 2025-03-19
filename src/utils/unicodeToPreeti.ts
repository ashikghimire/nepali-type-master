
// Mapping of Unicode Nepali characters to Preeti font characters
// This is the reverse mapping of preetiToUnicodeMap
const unicodeToPreetiMap: Record<string, string> = {
  // Basic vowels
  'अ': 'c',
  'आ': 'cf',
  'इ': 'O',
  'ई': 'O{',
  'उ': 'p',
  'ऊ': 'pm',
  'ए': 'P',
  'ऐ': 'P]',
  'ओ': 'cf]',
  'औ': 'cf}',
  
  // Basic consonants
  'क': 's',
  'ख': 'v',
  'ग': 'u',
  'घ': '3',
  'ङ': 'ª',
  'च': 'r',
  'छ': '5',
  'ज': 'h',
  'झ': 'em',
  'ञ': '`',
  'ट': '6',
  'ठ': '7',
  'ड': '8',
  'ढ': '9',
  'ण': '0f',
  'त': 't',
  'थ': 'y',
  'द': 'b',
  'ध': 'w',
  'न': 'g',
  'प': 'k',
  'फ': 'km',
  'ब': 'a',
  'भ': 'e',
  'म': 'd',
  'य': 'o',
  'र': '/',
  'ल': 'n',
  'व': 'j',
  'श': 'z',
  'ष': 'if',
  'स': ';',
  'ह': 'x',
  
  // Conjuncts and special characters
  'क्ष': 'If',
  'त्र': 'q',
  'ज्ञ': '1',
  
  // Maatras and modifiers
  'ा': 'f',
  'ि': 'l',
  'ी': 'L',
  'ु': '\'',
  'ू': '"',
  'े': ']',
  'ै': '}',
  'ो': 'f]',
  'ौ': 'f}',
  '्': '\\',
  'ं': '+',
  'ः': 'M',
  
  // Punctuation and other characters
  '।': '.',
  '?': '?',
  '!': '!',
  ',': ',',
  ';': ';',
  ':': ':',
  
  // Numbers
  '१': '!=',
  '२': '@=',
  '३': '#=',
  '४': '$=',
  '५': '%=',
  '६': '^=',
  '७': '&=',
  '८': '*=',
  '९': '(=',
  '०': ')=',
};

// Common Unicode word combinations that map to specific Preeti sequences
const commonCombinations: Record<string, string> = {
  'ने': 'g]',
  'पा': 'kf',
  'न्द': 'Gb',
  'दे': 'b]',
  'हो': 'xf]',
  'रा': '/f',
  'को': 'sf]',
};

// Function to convert Unicode text to Preeti
export const unicodeToPreeti = (unicodeText: string): string => {
  if (!unicodeText) return '';
  
  let preetiText = unicodeText;
  
  // First replace any common word combinations
  Object.keys(commonCombinations).forEach(key => {
    preetiText = preetiText.split(key).join(commonCombinations[key]);
  });
  
  // Then replace character by character for remaining text
  // We need to process from longest to shortest to avoid partial matches
  Object.keys(unicodeToPreetiMap)
    .sort((a, b) => b.length - a.length)
    .forEach(key => {
      preetiText = preetiText.split(key).join(unicodeToPreetiMap[key]);
    });
  
  return preetiText;
};
