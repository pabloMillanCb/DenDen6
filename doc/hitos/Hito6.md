En este hito se creará un docker compose que incluirá varios contenedores como el de nuestro microservicio, tests y logs.

## Creación de Docker Compose

Para configurar docker compose se creó el archivo [docker-compose.yml](). En este se describen los distintos contenedores de los que se compondrá nuestro sistema. Ejecutando los siguientes comandos podemos construir y ejecutar nuestro contenedor:
```
docker compose build .
docker compose up
```
Para cada servicio con el que cuente nuestro compose usaremos una etiqueta. Por ejemplo, para nuestro microservición se empreó `app`. Bajo esta etiqueta especificamos con el parámetro `build` el contexto en el que construiremos el compose y, si se fuera usar algún archivo que no se llamara `Dockerfile` para construir el contenedor, se incluye aquí. Con la etiqueta `ports` indicamos qué puertos expondrá el servicio.

El contenedor de app, por ejemplo, se describiría de la siguiente forma:
```
  app:
    build:
      context: .
    ports:
      - "5000:5000"
```

## Creación de contenedor de tests

Como ya se comentó en el hito anterior, se tuvieron que configurar el docker compose antes de tiempo para poder ejecutar los tests de api. Para ello se creó el archivo [Dockerfile_test](), donde se especifica un contenedor especial para los tests:

```
FROM node:21.4-alpine

WORKDIR /src

COPY package*.json ./

RUN apk add curl && npm install && npm update 

COPY ./ ./

EXPOSE 5050

CMD ["npm", "run", "test"]
```

Teniendo este contenedor y el de app, al ejecutar docker compose los test podrían dar fallidos en el caso en el que el servicio de app tardara más en estar disponible que el de test. Para ello, en el *docker-compose.yml* se definió un healthcheck para el servicio de app. Esta es una forma que tiene el contenedor de comprobar si ha terminado de levantar su servicio y está completamente operativo:
```
healthcheck:
        test: ["CMD", "curl", "-f", "http://localhost:5000"]
        interval: 15s
        timeout: 5s
        retries: 5
```
En este caso, realizamos una petición a localhost. Si el comando se ejecuta con éxito, se considera que está sano el servicio. Por otro lado, se añadió una etiqueta al contenedor de test para que dependiera de *app* bajo la condición de que el healthcheck fuera correcto:
```
depends_on:
      app:
        condition: service_healthy
```

Una vez realizado esto, al ejecutar el siguiente comando se iniciaban los servicios necesarios para ejecutar los tests:

```
docker compose run test
```

Por último restaba modificar los archivos [run_test.yml]() y [config.yml]() para que al realizarse la integración continua emplearan esta nueva forma de ejecutar los tests.

## Creación de contenedor de logs

