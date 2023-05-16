import { APIGatewayEventRequestContextV2, APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";
import { teochewGraphql_GET, teochewGraphql_POST } from './modules/teochewGraphql';

export const handler = async function(event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>): Promise<string> {
    /*
        "/extsearch" to wake up the service
        "/extsearch/:simpChin/:tradChin" to return the related teochew entries and audio names
        "/graphql" for graphql queries and mutations
    */
    const [topPath, simpChin, tradChin] = decodeURI(event.rawPath).split('/').slice(1);

    if (topPath === "graphql") {
        return JSON.stringify(await teochewGraphql_POST(JSON.parse(event.body || "{}")));
    }

    else {
        return (simpChin === undefined || tradChin === undefined) ? "{}" : JSON.stringify(await teochewGraphql_GET(simpChin, tradChin));
    }
}