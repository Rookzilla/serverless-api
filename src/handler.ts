import { APIGatewayProxyHandler } from 'aws-lambda';
import { ITEMS } from './consts/data';

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
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        message: ITEMS,
        input: event,
      }),
    };
  };