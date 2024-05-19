import { APIGatewayProxyHandler } from 'aws-lambda';

export const hello: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
      input: event,
    }),
  };
};

export const getLoot: APIGatewayProxyHandler = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'You got the loot!',
        input: event,
      }),
    };
  };