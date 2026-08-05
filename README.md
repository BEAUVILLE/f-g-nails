# FG NAILS — Pack GitHub Pages DIGIYLYFE

Site professionnel mobile-first pour FG NAILS à Saly.

## Contenu
- `index.html` : fiche publique + boutique MARKET + vidéos Drive
- `assets/data/catalogue.json` : prestations et produits
- `assets/data/videos.json` : liens des vidéos Google Drive
- `integrations/market-card.html` : cartouche à intégrer dans DIGIY MARKET
- `integrations/mon-commerce-config.json` : configuration MON COMMERCE
- `CNAME` : `fg-nails.digiylyfe.com`

## Ajouter un produit
Ouvrir `assets/data/catalogue.json`, puis ajouter un objet dans `products` :
```json
{
  "id": "gel-intime-01",
  "name": "Nom exact du produit",
  "category": "Hygiène femme",
  "description": "Description conforme à l’étiquette du fabricant.",
  "price": "5 000 FCFA",
  "image": "assets/images/nom-photo.webp",
  "active": true
}
```

## Ajouter une vidéo Drive
Dans `assets/data/videos.json` :
```json
{
  "title": "Présentation du soin",
  "description": "Fama explique la prestation.",
  "driveUrl": "https://drive.google.com/file/d/ID/view",
  "active": true
}
```

Les vidéos ne se lancent pas automatiquement : le client clique et ouvre Drive. Cela économise la bande passante.

## Doctrine
Facebook et TikTok diffusent. Cette fiche organise. WhatsApp garde le contact direct. DIGIYLYFE prélève 0 % de commission.
