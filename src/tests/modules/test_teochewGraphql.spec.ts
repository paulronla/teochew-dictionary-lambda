import { PartialDict } from '../../types/types';
import { jest, describe, it, expect } from '@jest/globals';

type ChaoyinType = typeof import("../../modules/chaoyin");
jest.mock<ChaoyinType>("../../modules/chaoyin");
import { genPartialDict as genPartialDictMock } from '../../modules/chaoyin';
import teochewGraphql from "../../modules/teochewGraphql";

const genPartialDict = jest.mocked(genPartialDictMock);

describe("test_teochewGraphql", () => {
    it("handles Chinese through GraphQL", async () => {
        genPartialDict.mockReturnValueOnce({
            pinyinChaoyinDictRes: {
                "好": {"hao3": "ho2"}
            },
            teochewAudioDictRes: {
                "ho2": "ABC123"
            }
        });

        const result = await teochewGraphql('好', '好');
        const expected: PartialDict = {
            "pinyinChaoyinDictRes": {
                "好": {"hao3": "ho2"}
            },
            "teochewAudioDictRes": {
                "ho2": "ABC123"
            }
        };

        expect(JSON.parse(JSON.stringify(result))).toStrictEqual(expected);
    });
});