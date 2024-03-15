# The EM GUIDE Tool

The EM GUIDE tool is a custom web application designed to support the editorial work of international journalists working in a multilingual environment.  

The development of the EM GUIDE tool has been accomplished in the context of the EM GUIDE project, learn more about it at [emgui.de](https://emgui.de).

## 🖊️ Features

- Document and manage articles;
- Create translation requests for articles;
- Email notifications to editors of content changes and comments;
- Search and filter articles;
- Content versioning;

A detailed user manual can be found [here](https://github.com/EM-GUIDE/em-guide-tool/wiki/User-manual). 

## ⚙️ General notes

The EM GUIDE tool has been developed using [Strapi](https://strapi.io/), a headless content management system. The Strapi admin panel, built with React, is utilized for content management without the need for a custom frontend. 

The EM GUIDE tool builds upon the Strapi to implement custom functionalities such as email notifications and commenting via custom plugins and lifecycle hooks. 
As feature work, a custom admin interface (frontend) may be implemented using the Strapi API.

## 🔨 Development notes

Clone this repository to get the code of the EM GUIDE tool. 

Use the following command to start the EM GUIDE tool in development mode. 

``` bash
yarn develop
```

Use the following command to start the EM GUIDE tool in production mode. 

``` bash
yarn start
```

Use the following command to (re)build if needed.

``` bash
yarn build
```

## 🏛️ Deployment notes

The EM GUIDE tool can be deployed using a Docker Compose setup (including a database, web proxy, and the application). 

Clone this repository to your deployment droplet. 

Use the following code to start the EM GUIDE tool on your production droplet.

  ` docker compose up`

When making changes to the code, use the following commands to stop & rebuild the application.

   ` docker compose down`

   ` docker compose build`

**Important note**: never down or delete the database volume as it stores the state of your application (users, articles, translation requests, settings etc.).  

## 🐛 Troubleshooting

The following commands may help with troubleshooting your setup. 

Use the `-d` option to read the logs of all Docker services.

   ` docker compose up -d`

Rebuild the application without cache.

   `docker compose build strapi --no-cache`

Check the disk usage of your Docker assets to make sure that your droplet's dick is not full, and delete unused assets as needed. 

   `docker system df`
