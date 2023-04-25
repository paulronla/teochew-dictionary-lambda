import { APIGatewayEventRequestContextV2, APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";
import { genPartialDict } from './modules/chaoyin';

export const handler = async function(event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>): Promise<string> {
    /*
        "/extsearch/" to wake up the service
        "/extsearch/:simpChin/:tradChin" to return the related teochew entries and audio names
    */
    const [simpChin, tradChin] = decodeURI(event.rawPath).split('/').slice(2);

    return (simpChin === undefined || tradChin === undefined) ? "{}" : JSON.stringify(genPartialDict(simpChin, tradChin));
}