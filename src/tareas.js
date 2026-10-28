export function agregar(tareas, texto) {
  if (!texto || !texto.trim()) throw new Error('El texto es obligatorio');
  return [...tareas, { id: Math.max(0, ...tareas.map(t => t.id)) + 1, texto: texto.trim(), completada: false }];
}
export function alternar(tareas, id) {
  return tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t);
}
export function filtrar(tareas, filtro = 'todas') {
  if (filtro === 'pendientes') return tareas.filter(t => !t.completada);
  if (filtro === 'completadas') return tareas.filter(t => t.completada);
  return [...tareas];
}
export function eliminar(tareas, id) {
  return tareas.filter(t => t.id !== id);
}
// ERROR INTENCIONAL: usa el índice de la lista filtrada sobre la lista original.
export function eliminarVisible(tareas, filtro, indiceVisible) {
  return tareas.filter((_, indice) => indice !== indiceVisible);
}
