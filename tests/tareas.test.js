import test from 'node:test';
import assert from 'node:assert/strict';
import { agregar, alternar, filtrar, eliminar, eliminarVisible } from '../src/tareas.js';
const base = [
  { id: 1, texto: 'Preparar presentación', completada: false },
  { id: 2, texto: 'Revisar documentación', completada: true },
  { id: 3, texto: 'Ejecutar las pruebas', completada: false }
];
test('agregar tarea', () => { const v=agregar(base, 'Nueva tarea'); assert.equal(v.length,4); assert.equal(v[3].texto,'Nueva tarea'); });
test('completar tarea', () => { assert.equal(alternar(base,1)[0].completada,true); });
test('filtrar pendientes y completadas', () => { assert.deepEqual(filtrar(base,'pendientes').map(t=>t.id),[1,3]); assert.deepEqual(filtrar(base,'completadas').map(t=>t.id),[2]); });
test('eliminar por identificador', () => { assert.deepEqual(eliminar(base,2).map(t=>t.id),[1,3]); });
test('eliminar segunda tarea de la vista pendientes', () => { assert.deepEqual(eliminarVisible(base,'pendientes',1).map(t=>t.id),[1,2]); });
test('eliminar primera tarea de la vista completadas', () => { assert.deepEqual(eliminarVisible(base,'completadas',0).map(t=>t.id),[1,3]); });
