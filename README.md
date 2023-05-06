# Projekt

## Futtatás Dockerrel
A projekt mappájában adjuk ki a következő parancsot:
```bash
docker compose up --build
```
Ezután a http://localhost:3000/ cimen érhető el az oldal.

## Futtatás közvetlenül
A projekt alapértelmezetten localhost:27017 cimen csatlakozik a MongoDB-hez, a hosztnév a DBHOST környezeti változóval állitható, vagy átirható az index.js fájl elején.

A projekt mappájában adjuk ki a következő parancsokat:
```bash
cd frontend
npm install
npm run build
cd ../backend
npm install
npm start
```
Ezután a http://localhost:3000/ cimen érhető el az oldal.
