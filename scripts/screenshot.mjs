/**
 * Captures d'écran d'un site pour la section « Réalisations ».
 *
 * Usage : npm run screenshot -- https://adresse-du-site.com nom-du-projet
 * Résultat : public/realisations/nom-du-projet.webp         (ordinateur, 1440 × 900)
 *            public/realisations/nom-du-projet-mobile.webp  (mobile, format téléphone)
 *
 * Utilise Microsoft Edge (installé sur Windows) ou Google Chrome, en mode invisible.
 * Les éléments flottants en bas d'écran (bulles de chat, bandeaux, badges) sont masqués.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const [url, name] = process.argv.slice(2);
if (!url || !name || !/^https?:\/\//.test(url)) {
  console.error('Usage : npm run screenshot -- https://adresse-du-site.com nom-du-projet');
  process.exit(1);
}

const BROWSERS = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const VIEWPORTS = [
  { suffix: '', width: 1440, height: 900, scale: 1, mobile: false, outputWidth: 1440 },
  { suffix: '-mobile', width: 390, height: 844, scale: 2, mobile: true, outputWidth: 520 },
];

const MOBILE_USER_AGENT =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36';

// Masque les éléments flottants (bulles de chat, badges, bandeaux) posés dans le bas de l'écran :
// on regarde ce qui se trouve sous quelques points du bas de l'écran et on masque tout élément fixe.
const HIDE_FLOATING = `(() => {
  const isFloating = (el) => ['fixed', 'sticky'].includes(getComputedStyle(el).position);
  const points = [];
  for (const x of [0.04, 0.1, 0.5, 0.9, 0.96]) {
    for (const y of [0.8, 0.86, 0.92, 0.97]) points.push([innerWidth * x, innerHeight * y]);
  }
  for (let pass = 0; pass < 4; pass++) {
    for (const [x, y] of points) {
      const top = document.elementFromPoint(x, y);
      if (!top) continue;
      let node = top;
      while (node && node !== document.body && !isFloating(node)) node = node.parentElement;
      if (!node || node === document.body) continue;
      const target = node.getBoundingClientRect().height < innerHeight * 0.6 ? node : top;
      target.style.setProperty('visibility', 'hidden', 'important');
    }
  }
})()`;

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

async function launchBrowser() {
  const executable = BROWSERS.find((path) => existsSync(path));
  if (!executable) throw new Error('Edge ou Chrome introuvable : indiquez son chemin avec la variable BROWSER_PATH.');
  const profile = mkdtempSync(join(tmpdir(), 'mosaiq-capture-'));
  const port = 9300 + Math.floor(Math.random() * 600);
  const child = spawn(
    executable,
    ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', '--mute-audio', 'about:blank'],
    { stdio: 'ignore' },
  );
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return { child, profile, endpoint: (await response.json()).webSocketDebuggerUrl };
    } catch {
      // Le navigateur démarre encore.
    }
    await sleep(250);
  }
  child.kill();
  throw new Error('Le navigateur ne répond pas.');
}

/** Client minimal du protocole Chrome DevTools. */
function connect(endpoint) {
  return new Promise((ready, fail) => {
    const socket = new WebSocket(endpoint);
    const pending = new Map();
    const listeners = new Set();
    let lastId = 0;

    socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      if (message.id && pending.has(message.id)) {
        const { resolve: done, reject } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else done(message.result);
      } else if (message.method) {
        listeners.forEach((listener) => listener(message));
      }
    });
    socket.addEventListener('error', () => fail(new Error('Connexion au navigateur impossible.')));
    socket.addEventListener('open', () =>
      ready({
        send(method, params = {}, sessionId) {
          const id = ++lastId;
          socket.send(JSON.stringify({ id, method, params, sessionId }));
          return new Promise((done, reject) => pending.set(id, { resolve: done, reject }));
        },
        waitFor(method, sessionId, timeout = 30000) {
          return new Promise((done) => {
            const listener = (message) => {
              if (message.method !== method || message.sessionId !== sessionId) return;
              clearTimeout(timer);
              listeners.delete(listener);
              done(message.params);
            };
            const timer = setTimeout(() => {
              listeners.delete(listener);
              done(null);
            }, timeout);
            listeners.add(listener);
          });
        },
        close: () => socket.close(),
      }),
    );
  });
}

async function capture(cdp, viewport, outputFile) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const send = (method, params) => cdp.send(method, params, sessionId);

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.scale,
    mobile: viewport.mobile,
  });
  if (viewport.mobile) {
    await send('Emulation.setUserAgentOverride', { userAgent: MOBILE_USER_AGENT });
    await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  }

  const loaded = cdp.waitFor('Page.loadEventFired', sessionId);
  await send('Page.navigate', { url });
  await loaded;
  // Laisse le temps aux animations d'entrée de se terminer.
  await sleep(3000);
  await send('Runtime.evaluate', { expression: HIDE_FLOATING });
  await sleep(300);

  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  await sharp(Buffer.from(data, 'base64')).resize({ width: viewport.outputWidth }).webp({ quality: 82 }).toFile(outputFile);
  await cdp.send('Target.closeTarget', { targetId });
}

const outputDir = resolve('public', 'realisations');
mkdirSync(outputDir, { recursive: true });

const browser = await launchBrowser();
try {
  const cdp = await connect(browser.endpoint);
  for (const viewport of VIEWPORTS) {
    const file = join(outputDir, `${name}${viewport.suffix}.webp`);
    await capture(cdp, viewport, file);
    console.log(`✓ ${file}`);
  }
  cdp.close();
  console.log(`\nAjoutez maintenant le projet dans src/data/projects.ts avec :
  image: '/realisations/${name}.webp',
  imageMobile: '/realisations/${name}-mobile.webp',`);
} finally {
  browser.child.kill();
  await sleep(500);
  try {
    rmSync(browser.profile, { recursive: true, force: true });
  } catch {
    // Dossier temporaire encore utilisé : il sera nettoyé par le système.
  }
}
