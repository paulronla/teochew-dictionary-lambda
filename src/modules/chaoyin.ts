import { PinyinChaoyinDict, TeochewAudioDict, PartialDict } from '../types/types';
const pinyinChaoyinDict: PinyinChaoyinDict = require('../../data/mandarin_teochew.json');
const teochewAudioDict: TeochewAudioDict = require('../../data/chaoyin_audio_map.json');
const { genToneSandhiSingle } = require('../shared_modules/playChaoyin');
const { mapInvalidChars } = require('../shared_modules/genChaoyin');

exports.genPartialDict = function (simpChin: string, tradChin: string) {
    const partialPinyinChaoyinDict: PinyinChaoyinDict = genPartialPinyinChaoyinDict(simpChin, tradChin);
    const partialTeochewAudioDict: TeochewAudioDict = genPartialTeochewAudioDict(partialPinyinChaoyinDict);
    
    const partialDicts: PartialDict = { 
        pinyinChaoyinDictRes: partialPinyinChaoyinDict, 
        teochewAudioDictRes: partialTeochewAudioDict,
    };

    return partialDicts;
};

function genPartialPinyinChaoyinDict(simpChars: string, tradChars: string) {
    const validSimpChars: string = mapInvalidChars(simpChars);
    const validTradChars: string = simpChars.length === validSimpChars.length ? tradChars : mapInvalidChars(tradChars);
    const partialPinyinChaoyinDict: PinyinChaoyinDict = {};

    if (!pinyinChaoyinDict) {
        return partialPinyinChaoyinDict;
    }

    for (let i = 0; i < validSimpChars.length; i++) {
        const hasSimpChar = pinyinChaoyinDict.hasOwnProperty(validSimpChars[i]);

        if (hasSimpChar
                || pinyinChaoyinDict.hasOwnProperty(validTradChars[i])) {
            const char = hasSimpChar ? validSimpChars[i] : validTradChars[i]; 
            
            if (!partialPinyinChaoyinDict.hasOwnProperty(char)) {
                partialPinyinChaoyinDict[char] = pinyinChaoyinDict[char];
            }
        }
    }

    return partialPinyinChaoyinDict;
}

function genPartialTeochewAudioDict(partialPinyinChaoyinDict: PinyinChaoyinDict) {
    const partialTeochewAudioDict: TeochewAudioDict = {};
    
    for (const char of Object.getOwnPropertyNames(partialPinyinChaoyinDict)) {
        const pinyinChaoyinMapping = partialPinyinChaoyinDict[char];

        for (const pinyin of 
                Object.getOwnPropertyNames(pinyinChaoyinMapping)) {
            
            const chaoyins = pinyinChaoyinMapping[pinyin].split('|')
                            .map(markedChaoyin => markedChaoyin.split('(')[0]);

            chaoyins.forEach(chaoyin => {
                if (!partialTeochewAudioDict.hasOwnProperty(chaoyin)
                        && teochewAudioDict.hasOwnProperty(chaoyin)) {
                    partialTeochewAudioDict[chaoyin] = teochewAudioDict[chaoyin];
                }

                const sandhiChaoyin: string = genToneSandhiSingle(chaoyin, teochewAudioDict);

                if (teochewAudioDict.hasOwnProperty(sandhiChaoyin)
                        && !partialTeochewAudioDict.hasOwnProperty(sandhiChaoyin)) {
                    partialTeochewAudioDict[sandhiChaoyin] 
                            = teochewAudioDict[sandhiChaoyin];
                }
            });
        }
    }

    return partialTeochewAudioDict;
}