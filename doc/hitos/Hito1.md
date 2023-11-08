## Términos y definiciones

Para la realización del Hito 1 era necesario redactar *historias de usuario* para definir la funcionalidad y *scope* del proyecto a desarrollar. Para ello se estimó necesario realizar algunos documentos necesarios para entender el resto de la documentación. Estos se pueden encontrar en el siguiente [documento](https://github.com/pabloMillanCb/DenDen6/blob/main/doc/terminos.md).

También era necesario describir los distintos tipos de usuarios que harían uso del sistema. Para ello se usaron *personas*. Estas son descripciones empleadas en metodologías ágiles la cual recogen una descripción general de un usuario (tanto sus características propias, su entorno, sus competencias...) y una explicación del uso que quiere darle al sistema. Estos usuarios, aun siendo personas concretas con nombre, representan los intereses generales de un grupo de usuarios de un tipo concreto. Estas *personas* se pueden consultar [aquí](https://github.com/pabloMillanCb/DenDen6/blob/main/doc/personas.md).

## Historias de usuario

Una vez teniendo claro los conceptos y personas, se pueden redactar las historias de usuario.

- [[HU-01] Como jugador quiero crear, almacenar, modificar y eliminar fichas de personaje así como su información para usarlas en partidas](https://github.com/pabloMillanCb/DenDen6/issues/2)
- [[HU-02] Como jugador quiero hacer tiradas con dados de 6 caras que puedan ver el resto de jugadores de mi partida para determinar si las acciones de mi personaje tienen éxito, añadiendo al resultado automáticamente los modificadores oportunos de mi personaje](https://github.com/pabloMillanCb/DenDen6/issues/3)
- [[HU-03] Como director de juego quiero añadir una o varias fichas de personaje a una partida y que estas no sean visibles para el resto de jugadores a menos que yo lo indique](https://github.com/pabloMillanCb/DenDen6/issues/4)
- [[HU-04] Como director de juego quiero añadir imágenes en la partida para que se muestren el resto de jugadores, así como eliminarlas](https://github.com/pabloMillanCb/DenDen6/issues/5)
- [[HU-05] Como director de juegos quiero añadir a varios personajes de la partida a un encuentro para generar una lista ordenada que indique el orden de turno de cada personaje a partir de la tirada e iniciativa de los respectivos participantes](https://github.com/pabloMillanCb/DenDen6/issues/6)
- [[HU-06] Como jugador quiero gestionar los modificadores temporales de los parámetros de mi personaje y que estos se apliquen a los resultados de mis tiradas para no tener que llevar la cuenta mentalmente](https://github.com/pabloMillanCb/DenDen6/issues/7)

Todas estas historias se añadieron como *issues* al repositorio del proyecto.

## Hitos

A parte de los hitos definidos por la asignatura, se establecieron otra seria de hitos referentes a la implementación del proyecto. Se tienen los siguientes:
- [Hito 1: Implementación de la lógica de las clases *Character* y *Session*](https://github.com/pabloMillanCb/DenDen6/issues/8)
- [Hito 2: Implementación de sesiones remotas volátiles](https://github.com/pabloMillanCb/DenDen6/issues/9)
- [Hito 3: Integración con base de datos](https://github.com/pabloMillanCb/DenDen6/issues/10)
- [Hito 4: Implementación de frontend](https://github.com/pabloMillanCb/DenDen6/issues/11)

##  Estructura inicial

Se definieron las siguientes entidades/clases para el proyecto. Haciendo click en cualquiera de ellos se puede acceder a su fichero:

- [User](https://github.com/pabloMillanCb/DenDen6/blob/main/src/user.ts): Usuario jugador registrado en el sistema.
- [Session](https://github.com/pabloMillanCb/DenDen6/blob/main/src/session.ts): Sesión de juego a la que se unen varios jugadores para una partida.
- [Personaje](https://github.com/pabloMillanCb/DenDen6/blob/main/src/personaje.ts): Representación de la ficha y estado de un personaje controlado por un jugador.

Se decidió implementar el proyecto usando Node.js con TypeScript. Esto se decidió por la experiencia previa de estas tecnologías, además de por la posibilidad de poder usar *vitest*, una librería para la creación de test que será de gran utilidad en hitos posteriores.