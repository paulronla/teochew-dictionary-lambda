import { handlerEvent as baseEvent } from './stubs/stubs.js';
import { handler } from '../handler.js';
import { PartialDict } from '../types/types';
import { strict as assert } from 'assert';

const helloWorldRes: PartialDict = {
    "pinyinChaoyinDictRes": {
        "你":{"ni3":"le2"},
        "好":{"hao3":"ho2(白)|hoh4(白)|haon3|hao2(文)","hao4":"haon3|hao2(文)"},
        "世":{"shi4":"si3"},
        "界":{"jie4":"gai3(文)|goi3(白)"}
    },
    "teochewAudioDictRes": {
        "le2":"1100_6F088E2A",
        "le6":"1102_C2FCBD84",
        "ho2":"0797_F3530784",
        "ho6":"0801_4626694B",
        "hoh4":"0799_ECE60E71",
        "hoh8":"0803_92A35539",
        "haon3":"0727_D9E0A3ED",
        "hao5":"0724_8F5C46F1",
        "hao2":"0722_FD8C7B0F",
        "hao6":"0725_6622DE35",
        "si3":"1596_CB06A3A2",
        "si5":"1598_03067F3F",
        "gai3":"0504_5D1569AD",
        "gai5":"0505_932484F2",
        "goi3":"0620_65221F5D",
        "goi5":"0622_6B44B4FD"
    },
};

(async () => {
    assert.deepStrictEqual(await handler({ ...baseEvent, rawPath: "/extsearch/"}), "{}");
    assert.deepStrictEqual(
        JSON.parse(await handler({ ...baseEvent, rawPath: "/extsearch/你好世界/你好世界" })), 
        helloWorldRes
    );
})();

const familyNameRes: PartialDict = {
    "pinyinChaoyinDictRes": {
        "罗":{"luo2":"lo5"}
    },
    "teochewAudioDictRes": {
        "lo5":"1148_DE5720BC",
        "lo7":"1149_F8350D11"
    },
};

(async () => {
    assert.deepStrictEqual(
        JSON.parse(await handler({ ...baseEvent, rawPath: "/extsearch/罗/羅" })), 
        familyNameRes
    );
})();

const rockRes: PartialDict = {
    "pinyinChaoyinDictRes": {
        "礐":{"que4":"gag4"}
    },
    "teochewAudioDictRes": {
        "gag4":"0514_E3657619",
        "gag8":"0516_4AFD7FFA"
    },
};

(async () => {
    assert.deepStrictEqual(
        JSON.parse(await handler({ ...baseEvent, rawPath: "/extsearch/𬒈/礐" })), 
        rockRes
    );
})();
