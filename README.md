# TypeScript + Node.js

En este artículo, veremos cómo ejecutar TypeScript con node.js.

## Recursos

- [https://tsx.is](https://tsx.is/)
- [https://tsx.is/watch-mode](https://tsx.is/watch-mode)
- [https://github.com/privatenumber/ts-runtime-comparison](https://github.com/privatenumber/ts-runtime-comparison)
- [https://nodejs.org/en/learn/typescript/run-natively](https://nodejs.org/en/learn/typescript/run-natively)

## Node.js + TSX

tsx significa TypeScript Execute y es una mejora de Node.js para ejecutar TypeScript.

tsx está diseñado para simplificar tu experiencia con TypeScript. Mejora la compatibilidad de Node.js con TypeScript tanto en modo CommonJS como ESM, lo que te permite cambiar entre ellos sin problemas. También admitetsconfig.jsonrutas e incluye un modo Watch para que el desarrollo sea aún más fácil.

tsx no comprueba el tipo de su código por sí solo y espera que se lo gestione por separado. Si bien tsx no requiere que se instale TypeScript y las comprobaciones de tipo que ofrece su IDE pueden ser suficientes para scripts rápidos, **se recomienda encarecidamente incluir un paso de comprobación de tipo en sus proyectos**.

### ¿ts-node?

La idea de tsx surgió en un momento en el que el ecosistema de Node.js se estaba fragmentando debido al lanzamiento de los módulos ES (ESM). A medida que los paquetes migraban a ESM, los proyectos luchaban por conciliar sus aplicaciones CommonJS con las dependencias de ESM.

En aquel entonces, `ts-node` era la herramienta de referencia para ejecutar TypeScript en Node.js, pero carecía de compatibilidad con ESM y era bastante complicada de usar. Observamos varias herramientas de código abierto que usaban esbuild para ejecutar TypeScript en Node.js y decidimos unir estos esfuerzos en un proyecto simple y cohesivo.

tsx está diseñado para simplificar tu experiencia con TypeScript. Mejora Node.js con compatibilidad con TypeScript tanto en modo CommonJS como ESM, lo que te permite cambiar entre ellos sin problemas. También admite `tsconfig.json` rutas e incluye un modo Watch para que el desarrollo sea aún más fácil.

### Instalación

Crear un proyecto de Node.js

```sh
npm init -y
```

- express: Para crear un servidor web
- typescript: Para comprobar el tipo con el tsccomando CLI
- @types/node: Para obtener la información de tipo de Node.js
- tsx: Para ejecutar TypeScript en tiempo de ejecución
- @types/express: Para obtener la información de tipo de Express

```sh
npm i express
```

```sh
npm i -D typescript @types/node tsx @types/express
```

Crear un archivo de configuración de TypeScript

```sh
npx tsc --init
```

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext", // Usa la versión más reciente de JavaScript
    "module": "ESNext", // Usa el sistema de módulos más reciente de JavaScript
    "strict": true, // Activa todas las comprobaciones estrictas para ayudar a encontrar errores
    "esModuleInterop": true, // Facilita la importación de módulos CommonJS
    "skipLibCheck": true, // Omite la verificación de tipos en los archivos de declaración para acelerar la compilación
    "forceConsistentCasingInFileNames": true, // Asegura que los nombres de archivo sean consistentes en mayúsculas y minúsculas
    "outDir": "./dist", // Carpeta donde se colocarán los archivos compilados
    "rootDir": "./src" // Carpeta raíz de los archivos fuente
  },
  "include": ["src/**/*"], // Incluye todos los archivos en la carpeta src y sus subcarpetas
  "exclude": ["node_modules", "dist"] // Excluye las carpetas node_modules y dist del proceso de compilación
}
```

package.json

- --clear-screen=false: Para que no se borre la pantalla al guardar un archivo

```json
{
  "type": "module",
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch --clear-screen=false src/index.ts",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.21.1"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "tsx": "^4.19.2",
    "typescript": "^5.6.3"
  }
}
```

src\index.ts

```ts
import express from "express";

const __dirname = import.meta.dirname;
console.log(__dirname);

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

Ejecutar el servidor en desarrollo

```sh
npm run dev
```

Construir el proyecto

```sh
npm run build
```

Ejecutar el proyecto en producción

```sh
npm start
```

## node --watch --experimental-strip-types src/index.ts

Desde la versión 22.6.0, Node.js tiene compatibilidad experimental con algunas sintaxis de TypeScript. Puedes escribir código que sea TypeScript válido directamente en Node.js sin necesidad de transpilarlo primero.

La bandera `--experimental-strip-types` le dice a Node.js que elimine las anotaciones de tipo del código TypeScript antes de ejecutarlo.

¡Y eso es todo! Ahora puedes ejecutar código TypeScript directamente en Node.js sin necesidad de transpilarlo primero y usar TypeScript para detectar errores relacionados con los tipos. Las versiones futuras de Node.js incluirán compatibilidad con TypeScript sin necesidad de una bandera de línea de comandos.

### A tomar en cuenta:

- **Sin transformaciones de TypeScript**: --experimental-strip-types no admite transformaciones de TypeScript. Si su archivo requiere transformaciones, Node.js arrojará un error.
- **Enumeraciones y espacios de nombres**: las enumeraciones y los espacios de nombres no son compatibles con --experimental-strip-types. Si su archivo contiene enumeraciones o espacios de nombres, Node.js arrojará un error.
- **Estado experimental**: --experimental-strip-types es una función experimental y puede cambiar en futuras versiones de Node.js.

Esto generará un error:

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction.Up);
```

`--experimental-strip-types` es una herramienta útil para scripts rápidos y pequeños, pero no es adecuada para proyectos grandes o complejos.

### ¿Cómo usar?

- `--watch`: Para que Node.js observe los cambios en el archivo y vuelva a ejecutarlo automáticamente, es nativo de Node.js.

```sh
node --watch --experimental-strip-types src/index.ts
```
