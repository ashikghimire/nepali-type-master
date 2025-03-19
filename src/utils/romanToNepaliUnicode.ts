
// Mapping of Roman transliteration to Unicode Nepali characters
const romanToUnicodeMap: Record<string, string> = {
  // Vowels
  'a': 'अ',
  'aa': 'आ',
  'i': 'इ',
  'ee': 'ई',
  'u': 'उ',
  'oo': 'ऊ',
  'e': 'ए',
  'ai': 'ऐ',
  'o': 'ओ',
  'au': 'औ',
  
  // Consonants
  'ka': 'क',
  'kha': 'ख',
  'ga': 'ग',
  'gha': 'घ',
  'nga': 'ङ',
  'cha': 'च',
  'chha': 'छ',
  'ja': 'ज',
  'jha': 'झ',
  'nya': 'ञ',
  'ta': 'ट',
  'tha': 'ठ',
  'da': 'ड',
  'dha': 'ढ',
  'na': 'न',
  'ta.': 'त',
  'tha.': 'थ',
  'da.': 'द',
  'dha.': 'ध',
  'na.': 'न',
  'pa': 'प',
  'pha': 'फ',
  'ba': 'ब',
  'bha': 'भ',
  'ma': 'म',
  'ya': 'य',
  'ra': 'र',
  'la': 'ल',
  'wa': 'व',
  'va': 'व',
  'sha': 'श',
  'shha': 'ष',
  'sa': 'स',
  'ha': 'ह',
  'ksha': 'क्ष',
  'tra': 'त्र',
  'gya': 'ज्ञ',
  
  // Half consonants (for conjuncts)
  'k': 'क्',
  'kh': 'ख्',
  'g': 'ग्',
  'gh': 'घ्',
  'ng': 'ङ्',
  'ch': 'च्',
  'chh': 'छ्',
  'j': 'ज्',
  'jh': 'झ्',
  'ny': 'ञ्',
  't': 'ट्',
  'th': 'ठ्',
  'd': 'ड्',
  'dh': 'ढ्',
  'n': 'न्',
  't.': 'त्',
  'th.': 'थ्',
  'd.': 'द्',
  'dh.': 'ध्',
  'n.': 'न्',
  'p': 'प्',
  'ph': 'फ्',
  'b': 'ब्',
  'bh': 'भ्',
  'm': 'म्',
  'y': 'य्',
  'r': 'र्',
  'l': 'ल्',
  'w': 'व्',
  'v': 'व्',
  'sh': 'श्',
  'shh': 'ष्',
  's': 'स्',
  'h': 'ह्',
  
  // Numbers
  '0': '०',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
  
  // Special characters
  '.': '।',
  'om': 'ॐ',
  'ri': 'ृ',
};

// Common patterns for vowel signs (maatras)
const vowelSigns: Record<string, string> = {
  'aa': 'ा',
  'i': 'ि',
  'ee': 'ी',
  'u': 'ु',
  'oo': 'ू',
  'e': 'े',
  'ai': 'ै',
  'o': 'ो',
  'au': 'ौ',
};

// Function to convert Roman transliteration to Unicode Nepali
export const romanToNepaliUnicode = (romanText: string): string => {
  if (!romanText) return '';
  
  // This is a simplified implementation
  // A full implementation would require more complex parsing logic
  
  // Replace direct patterns first
  let unicodeText = ' ' + romanText.toLowerCase() + ' '; // Add spaces to help with pattern matching
  
  // First we handle common words and phrases that have special transliteration
  const commonPhrases: Record<string, string> = {
    ' namaste ': ' नमस्ते ',
    ' nepali ': ' नेपाली ',
    ' nepal ': ' नेपाल ',
    ' namaskar ': ' नमस्कार ',
    ' dhanyabad ': ' धन्यवाद ',
  };
  
  Object.keys(commonPhrases).forEach(key => {
    unicodeText = unicodeText.split(key).join(commonPhrases[key]);
  });
  
  // Process Roman patterns from longest to shortest to avoid partial matches
  // This is a very simplified approach - a real implementation would use proper NLP techniques
  Object.keys(romanToUnicodeMap)
    .sort((a, b) => b.length - a.length)
    .forEach(key => {
      unicodeText = unicodeText.split(' ' + key + ' ').join(' ' + romanToUnicodeMap[key] + ' ');
      unicodeText = unicodeText.split(' ' + key).join(' ' + romanToUnicodeMap[key]);
      unicodeText = unicodeText.split(key + ' ').join(romanToUnicodeMap[key] + ' ');
    });
  
  // Process vowel signs - this is very simplified
  Object.keys(vowelSigns).forEach(key => {
    // Handle vowel signs that come after consonants
    for (const consonant of Object.keys(romanToUnicodeMap)) {
      if (consonant.endsWith('a') && consonant.length > 1) {
        const consonantBase = consonant.slice(0, -1);
        unicodeText = unicodeText.split(consonantBase + key).join(romanToUnicodeMap[consonant].slice(0, -1) + vowelSigns[key]);
      }
    }
  });
  
  // Cleanup extra spaces and return
  return unicodeText.trim();
};
