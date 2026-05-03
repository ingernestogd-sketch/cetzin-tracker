# Cetzin Ha Tracker 2026

PWA para el plan de 30 semanas de Cetzin. React + TypeScript + Vite + Tailwind + Supabase.

## Setup local

```bash
npm install
npm run dev
```

Variables ya configuradas en `.env.local`. Para correr el esquema en Supabase, abrí el SQL Editor y pegá el contenido de `supabase_schema.sql`.

## Build

```bash
npm run build
npm run preview
```

## Deploy a Vercel

1. Subí el repo a GitHub.
2. Conectá el repo en vercel.com.
3. En Vercel, en Settings → Environment Variables, agregá:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático en cada push a main.
