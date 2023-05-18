import { PartialDict } from '../../types/types';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

type ChaoyinType = typeof import("../../modules/chaoyin");
jest.mock<ChaoyinType>("../../modules/chaoyin");
import { genPartialDict as genPartialDictMock } from '../../modules/chaoyin';
import { teochewGraphql_GET, teochewGraphql_POST } from "../../modules/teochewGraphql";

const genPartialDict = jest.mocked(genPartialDictMock);

describe("test_teochewGraphql", () => {
    beforeEach(() => {
        genPartialDict.mockReturnValue({
            pinyinChaoyinDictRes: {
                "好": {"hao3": "ho2"}
            },
            teochewAudioDictRes: {
                "ho2": "ABC123"
            }
        });
    });

    it("handles Chinese through GraphQL middleware", async () => {
        const result = await teochewGraphql_GET('好', '好');
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

    it("handles GraphQL queries directly", async () => {
        const query = `
        query TeochewQuery($simpChin: String, $tradChin: String) {
            genPartialDict(simpChin: $simpChin, tradChin: $tradChin) {
                pinyinChaoyinDictRes
                teochewAudioDictRes
            }
        }
        `;

        const variables = {
            simpChin: "好",
            tradChin: "好",
        };

        const result = await teochewGraphql_POST({query, variables});
        const expected = {
            data: {
                genPartialDict: {
                    "pinyinChaoyinDictRes": {
                        "好": {"hao3": "ho2"}
                    },
                    "teochewAudioDictRes": {
                        "ho2": "ABC123"
                    }
                }
            }
        };

        expect(JSON.parse(JSON.stringify(result))).toStrictEqual(expected);
    });
});