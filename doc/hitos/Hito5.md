En este hito se realizó el desarrollo de un microservicio con la aplicación del proyecto. Para ello, se implementó una API para poder hacer uso de las funciones desarrolladas hasta ahora de la aplicación a través de peticiones HTTP. Además, se implementaron tests para comprobar el correcto funcionamiento de estas llamadas. Por último se implementó el volcado de logs a un archivo local.

## Framework para la implementación de la API y diseño

Para el desarrollo de la API se decidió usar Express, una infraestructura de aplicaciones web que corre sobre Node.js. Es minimalista, flexible y cuenta con todas métodos listos para describir llamadas HTTP e implementar middleware entre otros. Ya se contaba con experiencia previa con esta herramienta en el desarrollo de APIS, además de que casaba con todas las tecnologías usadas hasta ahora y haría que el microservicio fuera relativamente rápido de implementarse.

En [index.ts](https://github.com/pabloMillanCb/DenDen6/blob/main/src/index.ts) se inicializa la aplicación web de express que se encarga de recibir y despachar las peticiones. En [sessionHandler.ts](https://github.com/pabloMillanCb/DenDen6/blob/main/src/handlers/sessionHandler.ts) se implementaron los manejadores para las distintas llamadas que tendría la aplicación. En resumen, permitirían:

- Crear una sesión.
- Añadir y eliminar usuarios a una sesión.
- Añadir y eliminar personajes de una sesión.
- Realizar tiradas de dados con las estadísticas de un personaje en concreto, permitiendo calcular automáticamente los dados de daño dada una tirada previa.
- Añadir y substraer puntos de golpe a un personaje.
- Ordenar el orden de iniciativa de los personajes en la sesión.

. Para la instancia de la aplicación principal se siguió un esquema *singleton*, haciendo que en [app.ts](https://github.com/pabloMillanCb/DenDen6/blob/main/src/app.ts) se exportara una única instancia de la ejecución, que podría ser accedida desde cualquier otro lugar del código. 

## Testeo de API

Para testear la api se hizo uso de *Vitest*, el mismo framework de tests que se usó y describió en hitos anteriores. Para realizar las llamadas a la API se usó *Axios*, un cliente HTTP para navegadores y Node.js de código abierto ya que se conocía muy bien la herramienta. Los tests se implementaron en el archivo [api.test.ts](https://github.com/pabloMillanCb/DenDen6/blob/main/test/api.test.ts), y se ejecuta junto a los otros tests de la aplicación como se comentó en otros hitos.

Al implementar los tests se tuvieron en cuenta tanto los casos en los que las llamadas deberían resolverse adecuadamente como aquellos en los que se hace algo no permitido o erróneo y la API devuelve uhn código de error.

Surgió un problema a raíz de todo este enfoque. Vitest no crea una instancia del servidor cuando ejecuta la aplicación. Por ello, al ejecutar únicamente el comando de test, los relativos a la API daban fallidos ya que no podían conectarse con localhost. Esto se podía solucionar al ejecutarlo en un escritorio teniendo de fondo una instancia del servidor corriendo, pero para la integración continua suponía un problema, ya que los tests de Github Actions siempre daban error.

Para solucionarlo se creó un nuevo [dockerfile](https://github.com/pabloMillanCb/DenDen6/blob/main/Dockerfile_test) en el que se describe un nuevo contenedor cuya función es únicamente ejecutar los tests. Se usó Docker-compose para crear una aplicación multi contenedor en la que se tiene por un lado el contenedor de tests, y por otro el contenedo con el servidor desplegado al que se conectan los tests. La propia configuración del contenedor se encarga de asegurarse que el servidor está activo antes de empezar los tests. Como este material es relativo al Hito 6, se describirá ahí en detalle el proceso para configurarlo.

## Generación de logs

Para la generación de logs se consideraron dos librerías: Winston y Buynan. Ambas son interfaces sencillas con las que se pueden generar logs y volcarlos a archivos permanentes. Se escogió Winston porque tenía más opciones para desglosar los niveles de logs (es decir, nivel de error, warning, info, http, etc).

En el archivo [logs.ts](https://github.com/pabloMillanCb/DenDen6/blob/main/src/logs.ts) se define el logger. Se especifica que los imprima por dos vías: por terminal y en un archivo. Ese archivo será **logs.txt**, y se encuentra en la carpeta */logs*. Se especificó esta carpeta en el gitignore para que no se añadiera en los commits.
```
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    File: "./log.txt",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: 'logs.txt',
            dirname: `./logs`
        })
    ],
  });  
```

Se empleó middleware de Express para que se registraran todas las peticiones al servidor de la siguiente manera:

```
// Log all requests using logger
app.use('/',(req: any, res, next) => {

    logger.info({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      date: Date(),
    });
    next();
  });
```

Como de esta forma se registran unicamente las peticiones entrantes, se empleó el logger de la misma forma en [sessionHandler.ts](https://github.com/pabloMillanCb/DenDen6/blob/main/src/handlers/sessionHandler.ts) para que tuviera en cuenta los casos de error y los vuelque en un archivo distinto.