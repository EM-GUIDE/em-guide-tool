"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    email: {
        config: {
            provider: 'strapi-provider-email-resend',
            providerOptions: {
                apiKey: env('RESEND_API_KEY'),
            },
            settings: {
                defaultFrom: 'onboarding@resend.dev',
                defaultReplyTo: 'onboarding@resend.dev',
            },
        },
    },
    'admin-email-notifications': {
        enabled: true,
        resolve: './src/plugins/admin-email-notifications'
    },
    'admin-comments': {
        enabled: true,
        resolve: './src/plugins/admin-comments'
    }
});
