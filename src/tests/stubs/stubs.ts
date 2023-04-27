import { APIGatewayEventRequestContextV2, APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";

export const handlerEvent: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2> = {
    rawPath: "",
    version: "",
    routeKey: "",
    rawQueryString: "",
    headers: {},
    requestContext: {
        accountId: "",
        apiId: "",
        domainName: "",
        domainPrefix: "",
        http: {
            method: "",
            path: "",
            protocol: "",
            sourceIp: "",
            userAgent: ""
        },
        requestId: "",
        routeKey: "",
        stage: "",
        time: "",
        timeEpoch: 0
    },
    isBase64Encoded: false
};