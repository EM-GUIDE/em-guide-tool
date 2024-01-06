export default [
  {
    method: 'POST',
    path: '/',
    handler: 'subscribeController.index',
    config: {
      auth: false,
      policies: [],
    },
  },
];
