
export default ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-resend',
      providerOptions: {
        apiKey: env('RESEND_API_KEY'),
      },
      settings: {
        defaultFrom: env('RESEND_EMAIL'),
        defaultReplyTo: env('RESEND_EMAIL'),
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