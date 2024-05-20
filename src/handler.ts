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
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow any origin, or specify a particular origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allowed headers
      },
      body: JSON.stringify({
        message: ITEMS,
        input: event,
      }),
    };
  };