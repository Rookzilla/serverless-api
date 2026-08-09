import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { ITEMS } from './consts/data';
import { headers } from './consts/headers';

export const getLoot: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: ITEMS,
      input: event,
    }),
  };
};
// Prothero endpoints removed (EOL)