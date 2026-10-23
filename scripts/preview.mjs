/**
 * Aperçu local du site exporté (dossier /out), comme il sera servi par Netlify.
 * Usage : npm run build puis npm run preview → http://localhost:3000
 * Les envois de formulaires sont simulés et affichés dans ce terminal.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve('out');
const port = Number(process.env.PORT) || 3000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

if (!existsSync(root)) {
  console.error('Dossier /out introuvable : lancez d’abord « npm run build ».');
  process.exit(1);
}

/** /services/sites-web → out/services/sites-web.html (URL « propres », comme sur Netlify). */
function resolveFile(urlPath) {
  const pathname = normalize(decodeURIComponent(urlPath.split(/[?#]/)[0]));
  const base = join(root, pathname);
  if (base !== root && !base.startsWith(root + sep)) return null;
  for (const candidate of [base, `${base}.html`, join(base, 'index.html')]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const server = createServer((request, response) => {
  if (request.method === 'POST' && request.url?.startsWith('/__forms.html')) {
    let body = '';
    request.on('data', (chunk) => (body += chunk));
    request.on('end', () => {
      console.log('\n[Formulaire reçu — simulation locale]', Object.fromEntries(new URLSearchParams(body)));
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('OK');
    });
    return;
  }

  const file = resolveFile(request.url ?? '/');
  if (!file) {
    response.writeHead(404, { 'Content-Type': TYPES['.html'] });
    createReadStream(join(root, '404.html')).pipe(response);
    return;
  }
  response.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(response);
});

// Si le port est déjà pris par un autre programme, on essaie le suivant.
let currentPort = port;
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && currentPort < port + 10) {
    currentPort += 1;
    server.listen(currentPort);
  } else {
    throw error;
  }
});
server.on('listening', () => console.log(`Aperçu du site : http://localhost:${currentPort}`));
server.listen(currentPort);
