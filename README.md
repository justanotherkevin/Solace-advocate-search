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
  <video width="320" height="240" controls>
    <source src="[Screen Recording 2025-08-12 at 4.57.18 PM.mov](https://github.com/justanotherkevin/Solace-advocate-search/blob/main/main_demo.mov)" type="video/mp4">
  </video>
</details>
<details>
  <summary>V1 branch search with modal</summary>
  <video width="320" height="240" controls>
    <source src="[Screen Recording 2025-08-12 at 4.57.18 PM.mov](https://github.com/justanotherkevin/Solace-advocate-search/blob/main/v1_demo.mov)" type="video/mp4">
  </video>
</details>
