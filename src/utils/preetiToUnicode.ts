
// Mapping of Preeti font characters to Unicode Nepali characters
const preetiToUnicodeMap: Record<string, string> = {
  'g]': 'ने',
  'kf': 'पा',
  'n': 'ल',
  ';': '',
  "'": 'ु',
  'Gb': 'न्द',
  '/': 'र',
  'b]': 'दे',
  'z': 'श',
  'xf]': 'हो',
  '\\.': '।',
  'lxdf': 'हिमा',
  'kxf': 'पहा',
  '8': 'ड',
  't/f': 'तरा',
  'O{': 'ई',
  'efiff': 'भाषा',
  'xfd|f]': 'हाम्रो',
  '/fi': 'राष्',
  '6«': 'ट्र',
  'af]': 'बो',
  'Ng': 'ल्न',
  'n]': 'ले',
  'Vg': 'ख्न',
  'hfGg': 'जान्न',
  'sf]': 'को',
  'cfh': 'आज',
  'w]/}': 'धेरै',
  '/fd|f]': 'राम्रो',
  'cfsfz': 'आकाश',
  ';kmf': 'सफा',
  '\"o{': 'ूर्य',
  'rDsL': 'चम्की',
  '/x]': 'रहे',
  ';+:s[lt': 'संस्कृति',
  'k/Dk/f': 'परम्परा',
  'clt': 'अति',
  ';d[4': 'समृद्ध',
  ';+/If': 'संरक्ष',
  'd]/f]': 'मेरो',
  'gfd': 'नाम',
  's[i0f': 'कृष्ण',
  'a:': 'बस्',
  '5': 'छ',
  'dnfO{': 'मलाई',
  'vfgf': 'खाना',
  'dg': 'मन',
  'k5{': 'पर्छ',
  'sIff': 'कक्षा',
  'df': 'मा',
  'gofF': 'नयाँ',
  'lzIfs': 'शिक्षक',
  'cfpg': 'आउन',
  'eof]': 'भयो',
  'pxfF': 'उहाँ',
  ';w}+': 'सधैं',
  'uLtf': 'गीता',
  'Ps': 'एक',
  'd]xg': 'मेहन',
  '5fqf': 'छात्रा',
  'cÍ': 'अंक',
  'ofpF': 'याउँ',
  ';a}': 'सबै',
  'dfof': 'माया',
  'u5{': 'गर्छ',
  'g\\': 'न्',
  'k9\\g': 'पढ्न',
  '1fg': 'ज्ञान',
  ';|f]t': 'स्रोत',
  'zlQm': 'शक्ति',
  'afgL': 'बानी',
  'a;fNg': 'बसाल्न',
  '/fd': 'राम',
  'Zofd': 'श्याम',
  'b\'O{': 'दुई',
  ';fyL': 'साथी',
  'x\'': 'हु',
  ';Fu}': 'सँगै',
  'v]N': 'खेल्',
  'rf8': 'चाड',
  'kj{': 'पर्व',
  'dxTj': 'महत्व',
  'b;}+': 'दशैं',
  'ltxf/': 'तिहार',
  '57': 'छठ',
  'cGo': 'अन्य',
  'v\'z': 'खुस', // Fixed: 'v';' to 'v\'z'
  'Ln]': 'ीले',
  'dgf': 'मना',
  'OG5': 'इन्छ',
  // Add more mappings as needed
};

// Function to convert Preeti text to Unicode
export const preetiToUnicode = (preetiText: string): string => {
  // This is a simplified conversion - a full conversion would require more extensive mapping
  // and processing of complex character combinations
  let unicodeText = preetiText;
  
  // Replace multi-character combinations first (longer patterns before shorter ones)
  Object.keys(preetiToUnicodeMap)
    .sort((a, b) => b.length - a.length)
    .forEach(key => {
      unicodeText = unicodeText.split(key).join(preetiToUnicodeMap[key]);
    });
    
  return unicodeText;
};
