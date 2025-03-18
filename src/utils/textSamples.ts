
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
    english: "d laxfg lrof vfG5'।"
  },
  {
    unicode: "उसले मलाई फोन गर्‍यो।",
    preeti: "p;n] dnfO{ kmf]g u‍{of]।",
    english: "p;n] dnfO{ kmf]g u‍{of]।"
  },
  {
    unicode: "आज मौसम धेरै राम्रो छ।",
    preeti: "cfh df};d w]/} /fd|f] 5।",
    english: "cfh df};d w]/} /fd|f] 5।"
  },
  {
    unicode: "म किताब पढ्दै छु।",
    preeti: "d lstfa k9\b} 5'।",
    english: "d lstfa k9\b} 5'।"
  },
  {
    unicode: "हामी सबै विद्यालय जान्छौं।",
    preeti: "xfdL ;a} ljBfno hfG5f}+।",
    english: "xfdL ;a} ljBfno hfG5f}+।"
  },
  {
    unicode: "तिमी कता जाँदै छौ?",
    preeti: "ltdL stf hfFb} 5f}?",
    english: "ltdL stf hfFb} 5f}?"
  },
  {
    unicode: "खाना स्वादिष्ट छ।",
    preeti: "vfgf :jflbi6 5।",
    english: "vfgf :jflbi6 5।"
  },
  {
    unicode: "म संगीत सुन्दै छु।",
    preeti: "d ;+uLt ;'Gb} 5'।",
    english: "d ;+uLt ;'Gb} 5'।"
  },
  {
    unicode: "मेरो साथी अमेरिका गएको छ।",
    preeti: "d]/f] ;fyL cd]l/sf uPsf] 5।",
    english: "d]/f] ;fyL cd]l/sf uPsf] 5।"
  },
  {
    unicode: "हाम्रो गाउँ निकै सुन्दर छ।",
    preeti: "xfd|f] ufpF lgs} ;'Gb/ 5।",
    english: "xfd|f] ufpF lgs} ;'Gb/ 5।"
  },
  {
    unicode: "मैले नयाँ जुत्ता किनेँ।",
    preeti: "d}n] gofF h'Qf lsg]F।",
    english: "d}n] gofF h'Qf lsg]F।"
  },
  {
    unicode: "स्कूलमा रमाइलो भयो।",
    preeti: ":s\"ndf /dfOnf] eof]।",
    english: ":s\"ndf /dfOnf] eof]।"
  },
  {
    unicode: "बुबाले मलाई उपहार दिनुभयो।",
    preeti: "a'afn] dnfO{ pkxf/ lbg'eof]।",
    english: "a'afn] dnfO{ pkxf/ lbg'eof]।"
  },
  {
    unicode: "आज आइतबार हो।",
    preeti: "cfh cfOtaf/ xf]।",
    english: "cfh cfOtaf/ xf]।"
  },
  {
    unicode: "नेपाल एउटा सुन्दर देश हो।",
    preeti: "g]kfn Pp6f ;'Gb/ b]z xf]।",
    english: "g]kfn Pp6f ;'Gb/ b]z xf]।"
  },
  {
    unicode: "म क्रिकेट खेल्न जान्छु।",
    preeti: "d lqms]6 v]n\g hfG5'।",
    english: "d lqms]6 v]n\g hfG5'।"
  },
  {
    unicode: "हिजो राति धेरै पानी पर्‍यो।",
    preeti: "lxhf] /flt w]/} kfgL k‍{of]।",
    english: "lxhf] /flt w]/} kfgL k‍{of]।"
  },
  {
    unicode: "मलाई पढ्न मन पर्छ।",
    preeti: "dnfO{ k9\g dg k5{।",
    english: "dnfO{ k9\g dg k5{।"
  },
  {
    unicode: "तिमी किन रिसाएको?",
    preeti: "ltdL lsg l/;fPsf]?",
    english: "ltdL lsg l/;fPsf]?"
  },
  {
    unicode: "हामी सिनेमामा जाने योजना बनाउँदै छौं।",
    preeti: "xfdL l;g]dfdf hfg] of]hgf agfpFb} 5f}+।",
    english: "xfdL l;g]dfdf hfg] of]hgf agfpFb} 5f}+।"
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
