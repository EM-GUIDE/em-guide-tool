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

## ⚙️ Deployment

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
pnpm develop
# or
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
pnpm run start
# or
npm run start
# or
yarn start
```

### `build`

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

---
