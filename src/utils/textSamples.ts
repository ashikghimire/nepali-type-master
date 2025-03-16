
// Authentic Nepali text samples for typing tests in Preeti font mapping

export const textSamples = [
  "g]kfn Ps ;'Gb/ b]z xf] . of] lxdfn, kxf8 / t/fO{sf] b]z xf] .",
  "g]kfnL efiff xfd|f] /fi6«efiff xf] . o;nfO{ af]Ng / n]Vg hfGg' k5{ .",
  "cfhsf] lbg w]/} /fd|f] 5 . cfsfz ;kmf 5, ;"o{ rDsL/x]sf] 5 .",
  "g]kfnL ;+:s[lt / k/Dk/f clt g} ;d[4 5 . xfdLn] o;sf] ;+/If0f ug'{k5{ .",
  "d]/f] gfd s[i0f xf] . d g]kfndf a:5' . dnfO{ g]kfnL vfgf dg k5{ .",
  "cfh d]/f] sIffdf gofF lzIfs cfpg'eof] . pxfFn] xfdLnfO{ gofF s'/f l;sfpg'eof] .",
  "uLtf Ps d]xgtL 5fqf xf] . pm ;w}+ /fd|f] cÍ NofpF5] . ;a}n] p;nfO{ dfof u5{g\ .",
  "k9\g' 1fgsf] ;|f]t xf] . 1fg g} zlQm xf] . xfdLn] ;w}+ k9\g] afgL a;fNg'k5{ .",
  "/fd / Zofd b'O{ ;fyL x'g\ . ltgLx¿ ;w}+ ;Fu} v]N5g\ / k9\5g\ .",
  "g]kfndf rf8kj{x¿sf] w]/} dxTj 5 . b;}+, ltxf/, 57 / cGo rf8x¿ v';Ln] dgfOG5g\ ."
];

// Function to get a random text sample
export const getRandomText = (): string => {
  const randomIndex = Math.floor(Math.random() * textSamples.length);
  return textSamples[randomIndex];
};
