import { PartialDict } from '../types/types';
import { jest, describe, it, expect } from '@jest/globals';
import { handlerEvent as baseEvent } from './stubs/stubs';

type ChaoyinType = typeof import("../modules/chaoyin");
jest.mock<ChaoyinType>("../modules/chaoyin");
import { genPartialDict as genPartialDictMock } from '../modules/chaoyin';
import { handler } from '../handler';

const genPartialDict = jest.mocked(genPartialDictMock);

describe("test_handler", () => {
    it("handles Chinese", async () => {
        genPartialDict.mockReturnValueOnce({
            pinyinChaoyinDictRes: {
                "好": {"hao3": "ho2"}
            },
            teochewAudioDictRes: {
                "ho2": "ABC123"
            }
        });

        const result: string = await handler({ ...baseEvent, rawPath: "/extsearch/好/好" });
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