"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoot = exports.hello = void 0;
const hello = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World!',
            input: event,
        }),
    };
};
exports.hello = hello;
const getLoot = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'You got the loot!',
            input: event,
        }),
    };
};
exports.getLoot = getLoot;
