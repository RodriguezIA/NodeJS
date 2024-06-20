import http from 'http'

import { handleRequest } from '@/routes/database.routes'

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    // Responder con "Hello World!" para todas las peticiones GET a '/'
    if (req.url === '/' && req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World!');
    } else {
      // Delegar el manejo de otras rutas a handleRequest en database.routes.ts
      handleRequest(req, res);
    }
  });

server.listen(port, hostname, () => {
    console.log(`Server runing at http://${hostname}:${port}/`)
})