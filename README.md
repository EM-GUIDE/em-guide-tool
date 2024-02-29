# 🚀 EM Guide

EM Guide is a tool designed to support the editorial group work of online journalists.

## Features

- Document and manage articles
- Create translation requests
- Email notifications
- Search and filter articles
- Content versioning

## Getting started

### Adding articles

Admin users can add articles in the Conten Manager.

### Email notifications

By default, EM Guide uses [Resed](https://resend.com/) as the default provider for transactional emails. To enable this functionality, you need to specify the RESEND_API_KEY in your .env file. You can change the email provider in the plugin configuration file file located at `/config/plugins.ts`.
For more details, you can refer to the documentation [here](https://docs.strapi.io/dev-docs/providers).

## ⚙️ Development

### Develop

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
pnpm develop
# or
npm run develop
# or
yarn develop
```

### Start

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
pnpm run start
# or
npm run start
# or
yarn start
```

### Build

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
pnpm run build
# or
npm run build
# or
yarn build
```

Strapi also comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing artciles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

## ⚙️ Deployment

### Making changes

1. When making changes that should be reflected upon restarting the Strapi container, follow these steps:

   ` docker compose down`

2. Restart the Docker Compose services with the updated configuration. Use the command:

   ` docker compose up -d`

​ This command starts the services in detached mode, allowing you to continue using the terminal.

### Troubleshooting

If you encounter issues where changes are not visible after restarting the Strapi container, it may be necessary to rebuild the Strapi service without using the cache. Follow these steps:

1. Stop the Docker Compose services if they are running, using:

   `docker compose down`

2. Rebuild the Strapi service without cache to ensure all changes are applied. Use the command:

   `docker compose build strapi --no-cache`

   This command forces Docker to rebuild the Strapi service from scratch, ignoring any cached layers.

3. Restart the Docker Compose services to apply the changes:

   `docker compose up -d`

### Managing Docker System Resources

If you encounter errors related to the build cache size or lack of space on the server, you can manage Docker system resources using the following commands:

1. Check Docker system disk usage with:

   `docker system df`

   This command provides an overview of Docker's disk usage, helping you identify if there's a need to clean up.

2. Remove unused build cache with:

   `docker builder prune`

   This command cleans up the build cache, freeing up space if the build cache is taking up too much space.

3. Remove unused images with:

   `docker image prune`

   This command removes unused images, helping to reclaim disk space.
