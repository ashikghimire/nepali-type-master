
// Text samples for typing tests in both Unicode and Preeti formats

interface TextEntry {
  unicode: string;
  preeti: string;
}

// Collection of Nepali sentences in both Unicode and Preeti formats
export const textSamples: TextEntry[] = [
  {
    unicode: "म बिहान चिया खान्छु।",
    preeti: "d laxfg lrof vfG5'।"
  },
  {
    unicode: "उसले मलाई फोन गर्‍यो।",
    preeti: "p;n] dnfO{ kmf]g u‍{of]।"
  },
  {
    unicode: "आज मौसम धेरै राम्रो छ।",
    preeti: "cfh df};d w]/} /fd|f] 5।"
  },
  {
    unicode: "म किताब पढ्दै छु।",
    preeti: "d lstfa k9\b} 5'।"
  },
  {
    unicode: "हामी सबै विद्यालय जान्छौं।",
    preeti: "xfdL ;a} ljBfno hfG5f}+।"
  },
  {
    unicode: "तिमी कता जाँदै छौ?",
    preeti: "ltdL stf hfFb} 5f}?"
  },
  {
    unicode: "खाना स्वादिष्ट छ।",
    preeti: "vfgf :jflbi6 5।"
  },
  {
    unicode: "म संगीत सुन्दै छु।",
    preeti: "d ;+uLt ;'Gb} 5'।"
  },
  {
    unicode: "मेरो साथी अमेरिका गएको छ।",
    preeti: "d]/f] ;fyL cd]l/sf uPsf] 5।"
  },
  {
    unicode: "हाम्रो गाउँ निकै सुन्दर छ।",
    preeti: "xfd|f] ufpF lgs} ;'Gb/ 5।"
  },
  {
    unicode: "मैले नयाँ जुत्ता किनेँ।",
    preeti: "d}n] gofF h'Qf lsg]F।"
  },
  {
    unicode: "स्कूलमा रमाइलो भयो।",
    preeti: ":s\"ndf /dfOnf] eof]।"
  },
  {
    unicode: "बुबाले मलाई उपहार दिनुभयो।",
    preeti: "a'afn] dnfO{ pkxf/ lbg'eof]।"
  },
  {
    unicode: "आज आइतबार हो।",
    preeti: "cfh cfOtaf/ xf]।"
  },
  {
    unicode: "नेपाल एउटा सुन्दर देश हो।",
    preeti: "g]kfn Pp6f ;'Gb/ b]z xf]।"
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
