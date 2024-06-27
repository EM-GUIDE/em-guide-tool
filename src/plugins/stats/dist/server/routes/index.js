"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/data',
        handler: 'statController.index',
        config: {
            policies: [],
            auth: false
        },
    },
];
