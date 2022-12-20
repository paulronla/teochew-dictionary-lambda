export interface TeochewAudioDict {
    [teochew: string]: string
}

export interface PinyinChaoyinDict {
    [chineseChar: string]: {
        [pinyin: string]: string
    }
}

export interface PartialDict {
    pinyinChaoyinDictRes: PinyinChaoyinDict,
    teochewAudioDictRes: TeochewAudioDict,
}