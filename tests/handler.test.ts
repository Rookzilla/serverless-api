import { Context, Callback, APIGatewayProxyResult } from 'aws-lambda';
import { getLoot } from '../src/handler';
import { ITEMS } from '../src/consts/data';
import { APIGatewayProxyHeader } from '../src/types/api';

// Mock context and callback
const context: Context = {} as any;
const callback: Callback<APIGatewayProxyResult> = () => {};

describe('Handler Tests', () => {
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
});
