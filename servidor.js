import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const port = Number(process.env.PORT || 3000);
const routes = { '/': 'public/index.html', '/app.js': 'public/app.js', '/tareas.js': 'src/tareas.js' };
createServer(async (req, res) => {
  const path=routes[(req.url || '/').split('?')[0]];
  if (!path) { res.writeHead(404); return res.end('No encontrado'); }
  try {
    const data=await readFile(join(process.cwd(),path));
    res.writeHead(200, {'Content-Type':extname(path)==='.js'?'text/javascript; charset=utf-8':'text/html; charset=utf-8'});
    res.end(data);
  } catch { res.writeHead(500); res.end('Error del servidor'); }
}).listen(port,()=>console.log('Gestor de tareas: http://localhost:'+port));
