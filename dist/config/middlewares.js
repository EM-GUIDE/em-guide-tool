"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    'strapi::errors',
    'strapi::security',
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
    {
        name: "strapi::body",
        config: {
            formidable: {
                maxFileSize: 10 * 1024 * 1024, // ~10MB
            },
        },
    },
];
