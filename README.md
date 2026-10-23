# MOSAIQ — site vitrine

Site de **MOSAIQ** (https://mosaiq.company) : sites web vitrines, vidéos motion-design & UGC, intégration d'IA.
Construit avec **Next.js 16** (export statique), **React 19** et **TypeScript**, prêt pour **Netlify**.

- Page d'accueil complète : services, réalisations, témoignages, pourquoi MOSAIQ, processus, offres, devis personnalisé, FAQ, contact.
- 3 pages services optimisées pour Google : `/services/sites-web`, `/services/motion-design`, `/services/integration-ia`.
- Assistant virtuel intégré sur toutes les pages (FAQ, tarifs, demandes de rappel, renvoi vers WhatsApp).
- Formulaires (contact, devis, rappel) reçus via **Netlify Forms**.
- SEO : balises meta et Open Graph par page, données structurées schema.org, `sitemap.xml`, `robots.txt`.

---

## Démarrer en local

Prérequis : [Node.js](https://nodejs.org) 20.9 ou plus récent.

```bash
npm install        # installe les dépendances (une seule fois)
npm run dev        # site de développement : http://localhost:3000
```

Pour voir le site exactement comme en ligne :

```bash
npm run build      # génère le site dans le dossier /out
npm run preview    # l'affiche sur http://localhost:3000 (ou le port libre suivant)
```

En local, les formulaires ne sont pas réellement envoyés : l'envoi est simulé (et affiché dans le terminal avec `npm run preview`).

---

## Modifier le contenu

Tout le texte important est rassemblé dans `src/data/`, sans toucher au code :

| Fichier | Contenu |
| --- | --- |
| `site.ts` | Nom, téléphones, WhatsApp, e-mail, réseaux sociaux |
| `services.ts` | Les 3 services (accueil + pages dédiées) |
| `offers.ts` | Les forfaits et leurs prix |
| `projects.ts` | Les réalisations (portfolio) |
| `testimonials.ts` | Les témoignages clients |
| `faq.ts` | Les questions fréquentes (aussi utilisées par l'assistant) |
| `process.ts` | Les étapes de travail |

Les couleurs, rayons et ombres se règlent au début de `src/styles/globals.css`.

> Si vous changez un prix, recherchez aussi « 39 000 » dans le projet : quelques textes (titre Google de la page
> Sites web, FAQ) et l'image de partage `public/og-image.png` le mentionnent.

### Ajouter une réalisation

1. Générez les captures d'écran (Edge ou Chrome doit être installé) :

   ```bash
   npm run screenshot -- https://adresse-du-site.com nom-du-projet
   ```

   Cela crée `public/realisations/nom-du-projet.webp` (ordinateur) et `nom-du-projet-mobile.webp` (mobile).
2. Ajoutez une entrée dans `src/data/projects.ts` (copiez celle de Cheikh Amy Immo et adaptez-la).
3. Pour une vidéo motion-design, déposez le fichier `.mp4` dans `public/realisations/` et indiquez
   `video: '/realisations/ma-video.mp4'` : elle sera lue en boucle, sans le son. La carte « exemples sur demande »
   disparaît automatiquement dès qu'une réalisation motion-design est publiée.

### Réseaux sociaux

Ajoutez vos liens dans `socials` (fichier `src/data/site.ts`) : ils apparaissent automatiquement dans le pied de page.

---

## Formulaires (Netlify Forms)

Trois formulaires sont déclarés dans `public/__forms.html` : `contact`, `devis` et `assistant` (demandes de rappel).
Si vous ajoutez un champ dans un formulaire, ajoutez-le aussi dans ce fichier.

Après le premier déploiement sur Netlify :

1. **Site configuration → Forms → Enable form detection**, puis relancez un déploiement.
2. **Forms → Form notifications → Add notification → Email notification** : indiquez l'adresse qui doit recevoir
   les demandes (une notification par formulaire, ou une pour tous).

Un champ anti-spam invisible filtre les robots. Le plan gratuit de Netlify inclut 100 envois par mois.

---

## Assistant virtuel

L'assistant (`src/components/chat/` et `src/lib/assistant.ts`) fonctionne sans service externe :

- il répond à partir des offres, de la FAQ et des services du site (toujours à jour) ;
- il propose WhatsApp, l'appel ou un mini-formulaire de rappel ;
- pour lui apprendre de nouvelles questions, ajoutez des mots-clés ou des intentions dans `src/lib/assistant.ts`.

**Passer à Crisp (chat en direct)** : créez un compte sur [crisp.chat](https://crisp.chat), copiez votre « Website ID »
puis ajoutez sur Netlify la variable d'environnement `NEXT_PUBLIC_CRISP_WEBSITE_ID` (Site configuration →
Environment variables) et redéployez. Crisp remplace alors l'assistant intégré.

---

## Déploiement sur Netlify

La configuration est dans `netlify.toml` : commande `npm run build`, dossier publié `out`, Node 22.

**Option A — avec Git (recommandé, mise à jour automatique à chaque modification)**

1. Créez un dépôt sur GitHub et poussez ce projet :
   ```bash
   git remote add origin https://github.com/VOTRE-COMPTE/mosaiq-site.git
   git push -u origin main
   ```
2. Sur Netlify : **Add new site → Import an existing project → GitHub**, choisissez le dépôt.
   Les réglages sont lus automatiquement depuis `netlify.toml`.

**Option B — glisser-déposer**

Lancez `npm run build`, puis déposez le dossier `out` sur https://app.netlify.com/drop.

### Brancher le domaine mosaiq.company

1. Netlify : **Domain management → Add a domain** → `mosaiq.company`.
2. Chez votre registraire, pointez le domaine vers Netlify (serveurs DNS Netlify, ou enregistrements A/CNAME
   indiqués par Netlify).
3. Le certificat HTTPS est créé automatiquement par Netlify.

Les images sont optimisées par le **Netlify Image CDN** (redimensionnement, AVIF/WebP) lors des builds Netlify.

---

## À vérifier avant la mise en ligne

- **Témoignages** (`src/data/testimonials.ts`) : ce sont des **exemples fictifs**, à remplacer par de vrais avis.
- **FAQ** (`src/data/faq.ts`) : vérifiez les délais, les modalités de paiement (acompte, Orange Money, Moov Money…)
  et la politique de propriété des fichiers.
- **Offres** (`src/data/offers.ts`) : vérifiez le contenu exact de chaque forfait.

---

## Structure

```
public/            images, icônes, sitemap, robots.txt, __forms.html
scripts/           aperçu local (preview.mjs) et captures d'écran (screenshot.mjs)
src/data/          tout le contenu du site
src/components/    en-tête, pied de page, sections, formulaires, assistant
src/pages/         accueil, pages services, page 404
src/lib/           SEO, formulaires, assistant, utilitaires
src/styles/        styles globaux et des pages
```
