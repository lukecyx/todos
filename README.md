This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Setup

1. Clone the repo
2. Run

```sh
.../todos/ $ cp .env.sample .env
```

3. Update `.env` file with your values.
4. Run

```sh
.../todos/ $ docker compose up --build
```

## To get a user to login with

1. Have the app running from [setup stage](#setup)
2. Run

```sh
.../todos/ $ docker compose exec app sh
```

3. Run

```sh
.../todos/ $ docker compose exec app sh
```

4. Now inside the app container, run

```sh
/app $ pnpm run db:studio

> todos@0.1.0 db:studio /app
> pnpm dlx prisma studio

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555
```

5. Go to [localhost:5555](http://localhost:5555)
6. Click Users
7. Copy email from a user

## Sending Emails

### Prerequisites

- [awslocal](https://docs.localstack.cloud/user-guide/integrations/aws-cli/#localstack-aws-cli-awslocal)

Emails are simulated by using localstack.
