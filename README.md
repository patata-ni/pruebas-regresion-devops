# Gestor de tareas — Pruebas de regresión en DevOps

Práctica de clase: **pruebas de regresión** con un gestor de tareas construido con **JavaScript, Node.js y GitHub Actions**, sin dependencias externas.

## a) Introducción

Las pruebas de regresión verifican que los cambios en el software no alteren funciones que antes operaban bien. Este ejercicio utiliza un error intencional al **eliminar una tarea mientras hay un filtro activo**.

## b) Caso práctico

El sistema permite **agregar**, **completar**, **filtrar** y **eliminar** tareas. El defecto aparece cuando un programador utiliza el índice de la lista original en lugar del índice de las tareas filtradas.

Por ejemplo, las tareas iniciales son:
1. Preparar presentación — pendiente
2. Revisar documentación — completada
3. Ejecutar las pruebas — pendiente

Al seleccionar **Pendientes** y eliminar **Ejecutar las pruebas**, la versión defectuosa elimina por error **Revisar documentación**.

## c) Ejecutar la aplicación y las pruebas

Requiere **Node.js 22 o superior**.

```bash
npm test
npm start
```

Abre http://localhost:3000 para ver el gestor de tareas.

**Resultado correcto:** 6 pruebas aprobadas.

### Introducir la regresión (Windows PowerShell)

```powershell
Copy-Item .\variantes\tareas-con-error.js .\src\tareas.js -Force
npm test
```

Resultado esperado: **4 aprobadas y 2 fallidas**.

### Corregirla

```powershell
Copy-Item .\variantes\tareas-correctas.js .\src\tareas.js -Force
npm test
```

Resultado esperado: **6 aprobadas y 0 fallidas**.

## d) Guía DevOps para el grupo

1. En GitHub selecciona **Code → Download ZIP** y descomprime el proyecto, o ejecuta `git clone https://github.com/patata-ni/pruebas-regresion-devops.git`.
2. Abre la carpeta en VS Code y ejecuta `npm test`.
3. Inicia la interfaz con `npm start` y prueba el filtro de pendientes.
4. Crea una rama: `git switch -c feature/demo-regresion`.
5. Copia `variantes/tareas-con-error.js` sobre `src/tareas.js`; ejecuta `npm test`.
6. Registra el error: `git add src/tareas.js && git commit -m "test: demostrar regresion" && git push -u origin feature/demo-regresion`.
7. Abre un **Pull Request a main** y revisa el flujo en **Actions / Checks**: se esperan 2 pruebas fallidas.
8. Restaura `variantes/tareas-correctas.js` en `src/tareas.js`, crea otro commit y envíalo. El flujo debe mostrar las 6 pruebas aprobadas.

> El código defectuoso debe vivir **solo en una rama de demostración**. No lo integres a `main`.

## e) Resultados esperados

| Etapa | Aprobadas | Fallidas |
|---|---:|---:|
| Código correcto | 6 | 0 |
| Con regresión | 4 | 2 |
| Error corregido | 6 | 0 |

Las pruebas revisan: agregar una tarea, completar una, filtrar tareas, eliminar por ID y eliminar desde las vistas **Pendientes** y **Completadas**.

## f) Conclusión

Las pruebas de regresión detectan efectos indirectos de los cambios. Integradas con GitHub Actions, permiten identificar fallos en un Pull Request antes de incorporarlos a la rama principal.

## Estructura del proyecto

```text
.
├── .github/workflows/regresion.yml
├── public/index.html
├── public/app.js
├── src/tareas.js
├── variantes/tareas-correctas.js
├── variantes/tareas-con-error.js
├── tests/tareas.test.js
├── servidor.js
└── package.json
```
