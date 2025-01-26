FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm dlx prisma generate

# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm run build

FROM deps AS runner
COPY --from=deps /app/node_modules /app/node_modules
# COPY --from=build /app/dist /app/dist
EXPOSE 3000
EXPOSE 5555
# pnpm run db:migrate &&  pnpm run seed && next dev --turbopack
CMD [ "sh", "-c", "pnpm run db:migrate && pnpm run db:seed && pnpm run dev" ]
