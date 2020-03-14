# Installation

## Installation of basic requirements

See [TOOLS.md](TOOLS.md)

## Project Installation

1. Enter the folder

```sh
$ cd base-api
```

2. Install dependencies from npm

```sh
$ npm install
```

## Configurations

1. Copy configuration files from the database and modify default values

```sh
$ cp src/config/db.js.example src/config/db.js
```

## Initialize the database
To create the database and its initial configurations do the following:

1. Login to Postgres

```sh
$ sudo su - postgres
$ psql
```

1. Run the following command once inside the postgres console, where `PATH_PROJECT` can be obtained with the command `pwd` to get the full path of the base project.

```sh
postgres=# \i /PATH_PROJECT/sql/database.sql
```

## Run the project in development mode

```sh
npm run dev
```

<!-- ## Iniciar el servicio con pm2

```sh
$ env NODE_ENV=production pm2 start src/application/server.js --name "proyecto-api"
```

## Configurar Nginx

Editar el archivo de configuración `nano /etc/nginx/sites-enabled/default`

Agregar las siguientes lineas

```sh
  ...
  location /myapp/ {
    proxy_pass http://localhost:3000/;
  }
  ...
```

Reiniciar el servicio

```sh
$ sudo service nginx restart
``` -->

---
