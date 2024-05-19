"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoot = exports.hello = void 0;
const data_1 = require("./consts/data");
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
            message: data_1.ITEMS,
            input: event,
        }),
    };
};
exports.getLoot = getLoot;
