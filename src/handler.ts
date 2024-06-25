import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { ITEMS } from './consts/data';
import { headers } from './consts/headers';
import { EventError } from './types/errors';

// Initialize DynamoDB client
const dynamoDb = new DynamoDB.DocumentClient();
const PLAYERS_TABLE_NAME = 'prothero_db_players';

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

export const getProthero: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: PLAYERS_TABLE_NAME,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: data.Items,
        input: event,
      }),
    };
  } catch (error: EventError) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error fetching data',
        error: error.message,
      }),
    };
  }
};

export const setProthero: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {

  if (event.body === null) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: 'Invalid request body',
      }),
    };
  }

  const { id, name, type } = JSON.parse(event.body);

  const params = {
    TableName: PLAYERS_TABLE_NAME,
    Item: {
      id,
      name,
      type,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      
      body: JSON.stringify({
        message: 'Item added',
        input: event,
      }),
    };
  } catch (error: EventError) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error adding item',
        error: error.message,
      }),
    };
  }
};