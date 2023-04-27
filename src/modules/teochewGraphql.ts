import {
    graphql,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { genPartialDict } from "./chaoyin";

const partialDictType = new GraphQLObjectType({
    name: "PartialDict",
    fields: {
        pinyinChaoyinDictRes: { type: GraphQLJSONObject },
        teochewAudioDictRes: { type: GraphQLJSONObject },
    },
});

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        genPartialDict: {
            type: partialDictType,
            args: {
                simpChin: { type: GraphQLString },
                tradChin: { type: GraphQLString },
            },
        },
    },
});

const TEOCHEW_SCHEMA = new GraphQLSchema({ query: queryType });

const TEOCHEW_RESOLVERS = {
    genPartialDict: ({ simpChin, tradChin }: {
        simpChin: string,
        tradChin: string
    }) => genPartialDict(simpChin, tradChin)
};

const TEOCHEW_QUERY: string = `
    query TeochewQuery($simpChin: String, $tradChin: String) {
        genPartialDict(simpChin: $simpChin, tradChin: $tradChin) {
            pinyinChaoyinDictRes
            teochewAudioDictRes
        }
    }
`;

export default async function teochewGraphql(simpChin: string, tradChin: string) {
    return (await graphql({
        schema: TEOCHEW_SCHEMA,
        source: TEOCHEW_QUERY,
        rootValue: TEOCHEW_RESOLVERS,
        variableValues: { simpChin, tradChin },
    })).data?.genPartialDict;
};