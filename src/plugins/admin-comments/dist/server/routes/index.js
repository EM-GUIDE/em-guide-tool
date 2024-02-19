"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/comment',
        handler: 'commentController.find'
    },
    {
        method: 'POST',
        path: '/comment',
        handler: 'commentController.create',
    }
    // {
    // 	method: 'GET',
    // 	path: '/comment',
    // 	handler: 'noteController.find',
    // },
    // {
    // 	method: 'POST',
    // 	path: '/comment',
    // 	handler: 'noteController.create',
    // },
    // {
    // 	method: 'DELETE',
    // 	path: '/comment/:id',
    // 	handler: 'noteController.delete',
    // },
    // {
    // 	method: 'PUT',
    // 	path: '/comment/:id',
    // 	handler: 'commmentController.update',
    // },
];
