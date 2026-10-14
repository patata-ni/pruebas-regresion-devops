import { agregar, alternar, filtrar, eliminarVisible } from '/tareas.js';
let tareas = [
 {id:1,texto:'Preparar presentación',completada:false},
 {id:2,texto:'Revisar documentación',completada:true},
 {id:3,texto:'Ejecutar las pruebas',completada:false}
];
let filtro='todas';
const lista=document.querySelector('#lista');
function pintar(){
 const visibles=filtrar(tareas,filtro);
 lista.replaceChildren();
 document.querySelector('#empty').hidden=visibles.length>0;
 visibles.forEach((t, indice)=>{
  const li=document.createElement('li');
  if(t.completada)li.className='done';
  const label=document.createElement('label');
  const check=document.createElement('input');check.type='checkbox';check.checked=t.completada;
  check.addEventListener('change',()=>{tareas=alternar(tareas,t.id);pintar()});
  const span=document.createElement('span');span.textContent=t.texto;
  label.append(check,span);
  const borrar=document.createElement('button');borrar.textContent='Eliminar';borrar.setAttribute('aria-label','Eliminar '+t.texto);
  borrar.addEventListener('click',()=>{tareas=eliminarVisible(tareas,filtro,indice);pintar()});
  li.append(label,borrar);lista.append(li);
 });
}
document.querySelector('#form').addEventListener('submit',e=>{e.preventDefault();const campo=document.querySelector('#nueva');tareas=agregar(tareas,campo.value);campo.value='';pintar()});
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{filtro=btn.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===btn));pintar()}));
pintar();
