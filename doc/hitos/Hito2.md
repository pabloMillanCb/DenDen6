## Gestor de tareas

Para el gestor de tareas se usará *NPM*, *Node Package Manager*, el gestor de paquetes de *Node.js* que se lleva usando desde la práctica anterior. Además de ser un gestor de paquetes, con el que descargaremos y actualizaremos los paquetes necesarios para los test como se comentará en los siguientes apartados, tiene un [fichero de configuración](https://github.com/pabloMillanCb/DenDen6/blob/main/package.json) a través del cual podemos definir una orden para que se ejecuten todos los tests del proyecto.

```
"scripts": {
    "test": "vitest",
    "start:dev": "npx nodemon"
  }
```
Para ejecutar los tests correremos en la terminal la siguiente orden
```
$ npm run test
```
Obtenemos el output con los resultados
```
 ✓ test/personaje.test.ts (8)
 ✓ test/session.test.ts (5)

 Test Files  2 passed (2)
      Tests  13 passed (13)
   Start at  13:01:47
   Duration  929ms (transform 341ms, setup 1ms, collect 383ms, tests 62ms, environment 1ms, prepare 460ms)
```

## Framework y librería de aserciones

Para construir los tests se utilizó *Vitest*. Para este proyecto se utilizó desde un inicio *Vite*, un entorno de desarrollo para aplicaciones Typescript entre otros. *Vitest* es un framework nativo de *Vite* que reusa sus ficheros de configuración, y además incluye una librería de aserciones.

Los tests se ubican en la carpeta [*test*](https://github.com/pabloMillanCb/DenDen6/tree/main/test). Cada archivo sigue la nomenclatura de [nombre].test.ts. Todos los archivos definidos en esta carpeta se ejecutarán al lanzarse la orden *vitest*.

Dentro de cada archivo se pueden definir múltiples test. Tendrán esta estructura:

```
test('add and remove modifier', () => 
{
    ...
})
```
Dentro de los corchetes incluiremos todo el código necesario. Con funciones como *expect* y *toBe* podemos comprobar si un valor de la ejecución coincide con el esperado. En caso de que al menos de uno de estos resultados no coincida, el test salta y da error.

## Avance en la implementación

Se definieron 4 issues para el primer milestone:
- [Implementación de la clase Personaje](https://github.com/pabloMillanCb/DenDen6/issues/12)
- [Implementación de la clase Session](https://github.com/pabloMillanCb/DenDen6/issues/13)
- [Implementación de la clase App](https://github.com/pabloMillanCb/DenDen6/issues/15)
- [Creación de clases de datos auxiliares para limpiar el código](https://github.com/pabloMillanCb/DenDen6/issues/14)

De las cuales se han completado y cerrado las dos primeras.

## Tests implementados

Se implementaron los siguientes ficheros de test con sus respectivos tests:

### [personaje.test.ts](https://github.com/pabloMillanCb/DenDen6/tree/main/test/personaje.test.ts)
- six-sided die randomness
- attribute & domain modification & use in dice-roll
- set, take and heal damage
- set, take and heal mental damage
- add and remove modifier
- pep manipulation
- aura manipulation
- special effects manipulation

### [session.test.ts](https://github.com/pabloMillanCb/DenDen6/tree/main/test/session.test.ts)
- add or removing characters
- roll dice for characters
- check number of damage dice
- order initiative

Al ir desarrollando y ejecutando los tests se fueron detectando nuevos bugs que se fueron corrigiendo. Al final del hito todos los tests pasaban correctamente.

```
 ✓ test/personaje.test.ts (8)
 ✓ test/session.test.ts (5)

 Test Files  2 passed (2)
      Tests  13 passed (13)
   Start at  13:01:47
   Duration  929ms (transform 341ms, setup 1ms, collect 383ms, tests 62ms, environment 1ms, prepare 460ms)
```