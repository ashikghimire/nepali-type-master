
// Sample Nepali text for typing tests
// These are just placeholders - they should be replaced with proper Nepali text in Preeti font mapping

export const textSamples = [
  "g]kfnL efiffdf 6fOk ug{ l;sf}+ . of] Pp6f /dfOnf] cEof; xf] .",
  "g]kfn Ps ;'Gb/ b]z xf] . oxfF pRr lxdfn, kxf8 / t/fO{ 5g\ .",
  "1fg / lzIffsf] dxTj ;w}+ pRr x'G5 . xfdL ;a}n] k9\g'k5{ .",
  "g]kfnL ;+:s[lt / k/Dk/f w]/} ;d[4 5 . xfdL o;nfO{ hf]ufpg'k5{ .",
  "/fd|f] afgL a;fnf}+, ;kmf ;'U3/ /fvf}+ . :j:y hLjg latfcf}+ ."
];

// Function to get a random text sample
export const getRandomText = (): string => {
  const randomIndex = Math.floor(Math.random() * textSamples.length);
  return textSamples[randomIndex];
};
