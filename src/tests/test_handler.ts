const { handler } = require('../handler');
const assert = require('assert').strict;

const testResult = {
    "pinyinChaoyinDictRes": {
        "欢": { "huan1": "huan1|huang1(文)" },
        "呼": { "hu1": "hu1(文)|u1(白)|hou1|kou1"}
    },
    "teochewAudioDictRes": {
        "huan1": "0834_92B9A8AB",
        "huang1": "0839_ED026768",
        "hu1": "0822_FEDF41DC",
        "u1": "1844_8310DB9C",
        "hou1": "0816_F5784E6A",
        "kou1": "1042_6388D1FE"
    }
};

(async () => {
    assert.deepStrictEqual(await handler({"rawPath": "/extsearch/"}), "{}");
    assert.deepStrictEqual(
        JSON.parse(await handler({"rawPath": "/extsearch/%E6%AC%A2%E5%91%BC/%E6%AD%A1%E5%91%BC"})), 
        testResult
    );
})();