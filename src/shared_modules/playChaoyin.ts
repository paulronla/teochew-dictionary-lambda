/*
Teochew Pop-up Dictionary
Copyright (C) 2019 Paul La
https://github.com/paulronla/ 

---

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

---

Please do not change or remove any of the copyrights or links to web pages
when modifying any of the files.

*/
import { TeochewAudioDict } from '../types/types';

interface ToneMap {
    [tone: string]: string
}

interface PhonemeMap {
    [phoneme: string]: string
}

const TONE_SANDHI: ToneMap = {
    '1': '1',
    '2': '6',
    '3': '5',
    '4': '8',
    '5': '7',
    '6': '7',
    '7': '7',
    '8': '4'
};

const SIMILAR_TONES: ToneMap = {
    '7': '3'
};

const SIMILAR_INITIALS: PhonemeMap = {
    'bh': 'b',
    'gh': 'g'
}

const SIMILAR_FINALS: PhonemeMap = {
    'eng': 'ng',
    'b': 'g',
    'g': 'h',
    'h': 'g',
    'n': '',
    'ng': 'eng'
};

function audioExists(chaoyin: string, teochewAudioDict: TeochewAudioDict) {
    if (teochewAudioDict) {
        return teochewAudioDict.hasOwnProperty(chaoyin);
    }

    return false;
}

function genToneSandhi(chaoyinArr: string[], teochewAudioDict: TeochewAudioDict) {
    if (!audioExists(chaoyinArr[chaoyinArr.length - 1], teochewAudioDict)) {
        return '';
    }

    //last character in utterance doesn't change tone
    for (let idx = 0; idx < chaoyinArr.length - 1; idx++) {
        const newToneNum = TONE_SANDHI[chaoyinArr[idx].slice(-1)];
        const tonelessChaoyin = chaoyinArr[idx].slice(0, -1);
        chaoyinArr[idx] = "";

        for (let sel = 0; sel < 8 && !chaoyinArr[idx]; sel++) {
            let simTonelessChaoyin = tonelessChaoyin;
            let simNewToneNum = newToneNum;

            for (let i = 0, 
                    simInitArr = Object.getOwnPropertyNames(SIMILAR_INITIALS); 
                    !chaoyinArr[idx] && i < ((sel & 4) ? simInitArr.length : 1);
                    i++) {
                const initial = simInitArr[i];
                
                if ((sel & 4) && simTonelessChaoyin.slice(0, initial.length) === initial) {
                    simTonelessChaoyin = SIMILAR_INITIALS[initial] 
                            + simTonelessChaoyin.slice(initial.length);
                }

                for (let j = 0, 
                        simToneArr = Object.getOwnPropertyNames(SIMILAR_TONES); 
                        !chaoyinArr[idx] && j < ((sel & 2) ? simToneArr.length : 1); 
                        j++) {
                    const tone = simToneArr[j];

                    if ((sel & 2) && simNewToneNum === tone) {
                        simNewToneNum = SIMILAR_TONES[tone];
                    }

                    for (let k = 0, 
                            simFinArr = Object.getOwnPropertyNames(SIMILAR_FINALS);
                            !chaoyinArr[idx] && k < ((sel & 1) ? simFinArr.length : 1);
                            k++) {
                        const final = simFinArr[k];
                        
                        if ((sel & 1) && simTonelessChaoyin.slice(-final.length) === final) {
                            simTonelessChaoyin = simTonelessChaoyin.slice(0, -final.length) 
                                    + SIMILAR_FINALS[final];
                        }

                        chaoyinArr[idx] = chaoyinIfExists(simTonelessChaoyin 
                                    + simNewToneNum, teochewAudioDict) 
                                    || chaoyinIfExists(simTonelessChaoyin + 'n' 
                                    + simNewToneNum, teochewAudioDict);
                    }
                }
            }
        }

        if (!chaoyinArr[idx]) {
            return '';
        }
    }

    return chaoyinArr.join(' ');
}

function chaoyinIfExists(chaoyin: string, teochewAudioDict: TeochewAudioDict) {
    if (teochewAudioDict && teochewAudioDict[chaoyin]) {
        return chaoyin;
    }

    return '';
}

export const genToneSandhiSingle = function (chaoyin: string, teochewAudioDict: TeochewAudioDict) {
    return genToneSandhi([chaoyin, 'a1'], teochewAudioDict)
            .slice(0, -3);
            //doesn't tone change the last word -- a1 is a workaround
}