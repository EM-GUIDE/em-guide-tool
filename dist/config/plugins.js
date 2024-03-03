"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST'),
                port: env('SMTP_PORT'),
                auth: {
                    user: env('SMTP_USERNAME'),
                    pass: env('SMTP_PASSWORD'),
                },
                // debug: true,
                // logger: true
            },
            settings: {
                defaultFrom: env('SMTP_EMAIL'),
                defaultReplyTo: env('SMTP_EMAIL'),
            }
        }
    },
    'admin-email-notifications': {
        enabled: true,
        resolve: './src/plugins/admin-email-notifications'
    },
    'admin-comments': {
        enabled: true,
        resolve: './src/plugins/admin-comments'
    },
    'strapi-plugin-populate-deep': {
        config: {
            defaultDepth: 10
        }
    }
});
