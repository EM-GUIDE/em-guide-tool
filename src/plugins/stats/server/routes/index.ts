export default [
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
