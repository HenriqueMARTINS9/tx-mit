# Démo d'intégration vidéo

Une démo Next.js App Router qui compare trois stratégies d'intégration vidéo sur une seule page :

- `Intégration iFrame`
- `Intégration SDK`
- `Lecteur mobile natif`

## Technologies

- Next.js
- TypeScript
- Tailwind CSS
- Video.js

## Lancement en local

```bash
npm install
npm run dev
```

Ouvrez ensuite `http://localhost:3000`.

## Objectifs de la démo

- Montrer la rapidité d'une intégration simple via une iframe YouTube
- Montrer le niveau de contrôle supplémentaire offert par un lecteur SDK en JavaScript
- Montrer pourquoi la vidéo HTML5 native offre la meilleure expérience mobile sur iOS Safari et Android Chrome

## Notes de test mobile

- La section native utilise `controls`, `playsInline`, `webkit-playsinline` et `preload="metadata"`
- Sur mobile, testez la carte native en plein écran pour valider les contrôles système et le comportement de rotation
- La carte SDK utilise volontairement une interface pilotée par le web afin de contraster avec la lecture native
