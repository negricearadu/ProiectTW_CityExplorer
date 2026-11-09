Sigur, unul scurt și potrivit pentru proiectul tău:

 README.md✓

# City Explorer

Aplicație React pentru gestionarea destinațiilor de călătorie.

## Funcționalități

- afișează destinațiile într-o grilă responsive;
- calculează numărul destinațiilor nevizitate și zilele rămase;
- marchează destinațiile ca vizitate;
- adaugă și șterge destinații fără reîncărcarea paginii.

## Pornire

```bash
npm install
npm run server
```

Într-un al doilea terminal:

```bash
npm run dev
```

Serverul de date este disponibil la `http://localhost:3001/destinatii`, iar aplicația la `http://localhost:5173`.

Pentru setul mare de date folosit la exercițiul de optimizare:

```bash
npm run generate
npx json-server db-mare.json --port 3002
```

## Tehnologii

- React
- Vite
- CSS Grid și Flexbox