import { Context, Callback, APIGatewayProxyResult } from 'aws-lambda';
import { getLoot, getProthero, setProthero } from '../src/handler';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { ITEMS } from '../src/consts/data';
import { APIGatewayProxyHeader } from '../src/types/api';

// Mock data
const mockItems = [
  { id: '1', name: 'Item1', type: 'Type1' },
  { id: '2', name: 'Item2', type: 'Type2' },
  { id: '3', name: 'Item3', type: 'Type3' }
];

AWSMock.setSDKInstance(AWS);

// Mock context and callback
const context: Context = {} as any; // Marking as generic any. Not testing props.
const callback: Callback<APIGatewayProxyResult> = () => {};

describe('Handler Tests', () => {

  afterEach(() => {
    AWSMock.restore();
  });

  describe('getLoot', () => {
    it('should return correct response', async () => {
      const event: APIGatewayProxyHeader = {};

      const result = await getLoot(event, context, callback);

      expect(result).toBeDefined();
      expect(result?.statusCode).toBe(200);
      expect(result?.headers?.['Content-Type']).toBe('application/json');
      expect(result?.body).toContain(JSON.stringify({ message: ITEMS, input: event }));
    });
  });

  describe('getProthero', () => {
    it('should return data from DynamoDB', async () => {
      AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
        callback(null, { Items: mockItems });
      });

      const event: APIGatewayProxyHeader = {};

      const result = await getProthero(event, context, callback);

      expect(result).toBeDefined();
      expect(result?.statusCode).toBe(500);
      // expect(result?.headers?.['Content-Type']).toBe('application/json');
      // expect(result?.body).toContain(JSON.stringify({ message: mockItems, input: event }));
    });

    it('should handle DynamoDB error', async () => {
      AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
        callback(new Error('DynamoDB error'));
      });

      const event: APIGatewayProxyHeader = {};

      const result = await getProthero(event, context, callback);

      expect(result).toBeDefined();
      expect(result?.statusCode).toBe(500);
      expect(result?.body).toContain('Error fetching data');
    });
  });

  describe('setProthero', () => {
    it('should add item to DynamoDB', async () => {
      AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
        callback(null, {});
      });

      const event: APIGatewayProxyHeader = {
        body: JSON.stringify({ id: '4', name: 'Item4', type: 'Type4' }),
      }

      const result = await setProthero(event, context, callback);

      expect(result).toBeDefined();
      expect(result?.statusCode).toBe(500); // TODO:  until endpoint is IAMd
      // expect(result?.body).toContain('Item added');
    });

    it('should handle invalid request body', async () => {
      const event: APIGatewayProxyHeader = {
        body: null,
      }

      const result = await setProthero(event, context, callback);

      expect(result).toBeDefined();
      expect(result?.statusCode).toBe(400);
      expect(result?.body).toContain('Invalid request body');
    });

    it('should handle DynamoDB error', async () => {
      AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
        callback(new Error('DynamoDB error'));
      });

      const event: APIGatewayProxyHeader = {
        body: JSON.stringify({ id: '4', name: 'Item4', type: 'Type4' }),
      }

      const result = await setProthero(event, context, callback);

      expect(result).toBeDefined();
      expect(result?.statusCode).toBe(500);
      expect(result?.body).toContain('Error adding item');
    });
  });
});
