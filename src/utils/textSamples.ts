
// Text samples for typing tests in Unicode, Preeti and English formats

interface TextEntry {
  unicode: string;
  preeti: string;
  english: string;
}

// Collection of sentences in Unicode, Preeti and English formats
export const textSamples: TextEntry[] = [
  {
    unicode: "म बिहान चिया खान्छु।",
    preeti: "d laxfg lrof vfG5'।",
    english: "I drink tea in the morning."
  },
  {
    unicode: "उसले मलाई फोन गर्‍यो।",
    preeti: "p;n] dnfO{ kmf]g u‍{of]।",
    english: "He called me on the phone."
  },
  {
    unicode: "आज मौसम धेरै राम्रो छ।",
    preeti: "cfh df};d w]/} /fd|f] 5।",
    english: "The weather is very nice today."
  },
  {
    unicode: "म किताब पढ्दै छु।",
    preeti: "d lstfa k9\b} 5'।",
    english: "I am reading a book."
  },
  {
    unicode: "हामी सबै विद्यालय जान्छौं।",
    preeti: "xfdL ;a} ljBfno hfG5f}+।",
    english: "We all go to school."
  },
  {
    unicode: "तिमी कता जाँदै छौ?",
    preeti: "ltdL stf hfFb} 5f}?",
    english: "Where are you going?"
  },
  {
    unicode: "खाना स्वादिष्ट छ।",
    preeti: "vfgf :jflbi6 5।",
    english: "The food is delicious."
  },
  {
    unicode: "म संगीत सुन्दै छु।",
    preeti: "d ;+uLt ;'Gb} 5'।",
    english: "I am listening to music."
  },
  {
    unicode: "मेरो साथी अमेरिका गएको छ।",
    preeti: "d]/f] ;fyL cd]l/sf uPsf] 5।",
    english: "My friend has gone to America."
  },
  {
    unicode: "हाम्रो गाउँ निकै सुन्दर छ।",
    preeti: "xfd|f] ufpF lgs} ;'Gb/ 5।",
    english: "Our village is very beautiful."
  },
  {
    unicode: "मैले नयाँ जुत्ता किनेँ।",
    preeti: "d}n] gofF h'Qf lsg]F।",
    english: "I bought new shoes."
  },
  {
    unicode: "स्कूलमा रमाइलो भयो।",
    preeti: ":s\"ndf /dfOnf] eof]।",
    english: "It was fun at school."
  },
  {
    unicode: "बुबाले मलाई उपहार दिनुभयो।",
    preeti: "a'afn] dnfO{ pkxf/ lbg'eof]।",
    english: "Father gave me a gift."
  },
  {
    unicode: "आज आइतबार हो।",
    preeti: "cfh cfOtaf/ xf]।",
    english: "Today is Sunday."
  },
  {
    unicode: "नेपाल एउटा सुन्दर देश हो।",
    preeti: "g]kfn Pp6f ;'Gb/ b]z xf]।",
    english: "Nepal is a beautiful country."
  },
  {
    unicode: "म क्रिकेट खेल्न जान्छु।",
    preeti: "d lqms]6 v]n\g hfG5'।",
    english: "I go to play cricket."
  },
  {
    unicode: "हिजो राति धेरै पानी पर्‍यो।",
    preeti: "lxhf] /flt w]/} kfgL k‍{of]।",
    english: "It rained a lot last night."
  },
  {
    unicode: "मलाई पढ्न मन पर्छ।",
    preeti: "dnfO{ k9\g dg k5{।",
    english: "I like to read."
  },
  {
    unicode: "तिमी किन रिसाएको?",
    preeti: "ltdL lsg l/;fPsf]?",
    english: "Why are you angry?"
  },
  {
    unicode: "हामी सिनेमामा जाने योजना बनाउँदै छौं।",
    preeti: "xfdL l;g]dfdf hfg] of]hgf agfpFb} 5f}+।",
    english: "We are planning to go to the cinema."
  }
];

// Get a random text sample
export const getRandomText = (): TextEntry => {
  const randomIndex = Math.floor(Math.random() * textSamples.length);
  return textSamples[randomIndex];
};

// Get all text samples
export const getAllTextSamples = (): TextEntry[] => {
  return textSamples;
};
