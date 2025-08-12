## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```

## Preview

<details>
  <summary>Main branch demo</summary>
  demo video of main branch

  https://github.com/user-attachments/assets/8596a7df-7281-4990-bf60-5e0f46c242ff

</details>

<details>
  <summary>V1 branch search with modal</summary>
  demo video of v1 branch with filter modal
  
  https://github.com/user-attachments/assets/1f34ec9b-6351-41ee-9f73-ab9930ea8870

</details>
