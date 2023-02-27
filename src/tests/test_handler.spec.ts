import { PartialDict } from '../types/types';
import { jest, describe, it, expect } from '@jest/globals';

describe("test_handler", () => {
    it("handles Chinese", async () => {
        jest.mock("../modules/chaoyin");
        const chaoyin = require('../modules/chaoyin');
        const { handler } = require('../handler');

        chaoyin.genPartialDict.mockReturnValueOnce({
            pinyinChaoyinDictRes: {
                "好": {"hao3": "ho2"}
            },
            teochewAudioDictRes: {
                "ho2": "ABC123"
            }
        });

        const event = {
            rawPath: "/extsearch/好/好"
        };

        const result: string = await handler(event);
        const expected: PartialDict = {
            "pinyinChaoyinDictRes": {
                "好": {"hao3": "ho2"}
            },
            "teochewAudioDictRes": {
                "ho2": "ABC123"
            }
        };

        expect(result).toStrictEqual(JSON.stringify(expected));
    });
});