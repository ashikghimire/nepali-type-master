
// Text samples for typing tests in Unicode, Preeti and English formats

interface TextEntry {
  unicode: string;
  preeti: string;
  english: string;
}

// Collection of sentences in Unicode, Preeti and English formats
export const textSamples: TextEntry[] = [
  {
    unicode: "क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ",
    preeti: "s v u 3 ª r 5 h em ` 6 7 8 9 0f t y b w g k km a e d o / n j z if ; x If q 1",
    english: "s v u 3 ª r 5 h em ` 6 7 8 9 0f t y b w g k km a e d o / n j z if ; x If q 1"
  },
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

// Longer educational text for special display
export const educationText = {
  title: "शिक्षा: मानव सभ्यताको मेरुदण्ड",
  unicode: [
    "शिक्षा मानव सभ्यताको मेरुदण्ड हो। यो समाजको उन्नति, समृद्धि र सांस्कृतिक संरक्षणको लागि महत्त्वपूर्ण तत्व हो। शिक्षाले व्यक्ति मात्र नभई समग्र राष्ट्रलाई मार्गदर्शन गर्छ। कुनै पनि देशको उन्नति शिक्षाको स्तरमा निर्भर गर्दछ। ज्ञानको गहिराइमा पुग्नका लागि शिक्षा अनिवार्य छ।",
    "शिक्षा व्यक्तिको बौद्धिक क्षमता अभिवृद्धि गर्ने माध्यम हो। शिक्षाले तार्किक सोचाइलाई प्रखर बनाउँछ र विश्लेषणात्मक दृष्टिकोण विकसित गर्छ। व्यावहारिक जीवनमा कठिन परिस्थिति समाधान गर्न शिक्षाले मुख्य भूमिका खेल्छ। उदाहरणस्वरूप, वैज्ञानिक अनुसन्धानहरू, प्रविधिको विकास, औद्योगिक क्रान्ति आदिको मूल आधार नै शिक्षा हो।",
    "शिक्षाको अभावमा समाज अन्योलग्रस्त हुन्छ। अशिक्षित समुदायमा अन्धविश्वास, दुराचार, कुरीति तथा कुप्रथाहरू व्याप्त हुन्छन्। शिक्षित समाजमा नैतिक मूल्यहरू, सहिष्णुता, समावेशी दृष्टिकोण र समानता प्रवर्द्धन हुन्छ। शिक्षाले व्यक्तिलाई नैतिकता, उत्तरदायित्व तथा नागरिक कर्तव्यबारे सचेत बनाउँछ।",
    "आजको डिजिटल युगमा शिक्षाले प्रविधिसँग हातेमालो गर्दै अगाडि बढ्नु आवश्यक छ। प्रविधिको प्रभावशाली उपयोगले शिक्षालाई सहज, आकर्षक र प्रभावकारी बनाउँछ। अनलाइन शिक्षा, कृत्रिम बुद्धिमत्ता, डिजिटल कक्षा आदिले आधुनिक शिक्षामा क्रान्ति ल्याएका छन्। तर, प्रविधिको असीमित प्रयोगले मानिसलाई आलस्य, परनिर्भरता र सामाजिक अलगावको अवस्थामा पुर्‍याउने खतरा पनि रहन्छ।",
    "समग्रमा, शिक्षा एक अमूल्य सम्पत्ति हो जसले व्यक्तिलाई आत्मनिर्भर, सक्षम र जागरूक बनाउँछ। शिक्षित नागरिक राष्ट्रको मेरुदण्ड हुन्। शिक्षाको माध्यमबाट मात्र देश समुन्नत, सुव्यवस्थित र सुसंस्कृत बन्न सक्छ। त्यसैले, हाम्रा सबै नीति तथा योजनाहरू शिक्षाको प्रवर्द्धनमा केन्द्रित हुनुपर्छ।"
  ],
  preeti: [
    "lzIff dfgj ;Eotfsf] d]?b08 xf]. of] ;dfhsf] pGglt, ;d[l4 / ;f+:s[lts ;+/If0fsf] nflu dxQ\jk"0f{ tTj xf]. lzIffn] JolQm dfq geO{ ;du| /fi6«nfO{ dfu{bz{g u5{. s'g} klg b]zsf] pGglt lzIffsf] :t/df lge{/ ub{5. 1fgsf] ulx/fOdf k'Ugsf nflu lzIff clgjfo{ 5.",
    "lzIff JolQmsf] af}l4s Ifdtf clej[l4 ug{] dfWod xf]. lzIffn] tfls{s ;f]rfOnfO{ k|v/ agfpF5 / ljZn]if0ffTds b[li6sf]0f ljsl;t u5{. Jofjxfl/s hLjgdf sl7g kl/l:ylt ;dfwfg ug{ lzIffn] d'Vo e"ldsf v]n\5. pbfx/0f:j¿k, j}1flgs cg';Gwfgx¿, k|ljlwsf] ljsf;, cf}Bf]lus qmflGt cflbsf] d"n cfwf/ g} lzIff xf].",
    "lzIffsf] cefjdf ;dfh cGof]nu|:t x'G5. clzlIft ;d'bfodf cGwljZjf;, b'/frf/, s'/Llt tyf s'k|yfx¿ JofKt x'G5G. lzlIft ;dfhdf g}lts d"n\ox¿, ;lxi0f'tf, ;dfj]zL b[li6sf]0f / ;dfgtf k|j4{g x'G5. lzIffn] JolQmnfO{ g}ltstf, pQ/bfloTj tyf gful/s st{Joaf/] ;r]t agfpF5.",
    "cfhsf] l8lh6n o'udf lzIffn] k|ljlw;Fu xft]dfnf] ub{} cufl8 a9\g' cfjZos 5. k|ljlwsf] k|efjzfnL pkof]un] lzIffnfO{ ;xh, cfsif{s / k|efjsf/L agfpF5. cgnfOg lzIff, s[lqd a'l4dQf, l8lh6n sIff cflbn] cfw'lgs lzIffdf qmflGt n\ofPsf 5G. t/, k|ljlwsf] c;Lldt k|of]un] dflg;nfO{ cfn:o, k/lge{/tf / ;fdflhs cnufjsf] cj:yfdf k'‍{ofpg] vt/f klg /xG5.",
    ";du|df, lzIff Ps cd"n\o ;Dklq\ xf] h;n] JolQmnfO{ cfTdlge{/, ;Ifd / hfu¿s agfpF5. lzlIft gful/s /fi6«sf] d]?b08 x'G. lzIffsf] dfWodaf6 dfq b]z ;d'Ggt, ;'Jojl:yt / ;';+:s[t aGg ;S5. To;}n], xfd|f ;a} gLlt tyf of]hgfx¿ lzIffsf] k|j4{gdf s]lG›t x'g'k5{."
  ]
};
