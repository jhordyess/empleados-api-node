FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm pkg delete scripts.prepare

RUN yarn --frozen-lockfile

COPY tsconfig.json webpack.config.cjs .env ./
COPY prisma ./prisma
COPY src ./src

RUN yarn prisma generate && yarn build


FROM node:18-alpine

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/dist ./dist
COPY docs/openapi.json ./docs/openapi.json
COPY prisma ./prisma
COPY package.json cmd.prod.sh ./

RUN npm pkg delete scripts.prepare

RUN yarn --frozen-lockfile

EXPOSE 3000

CMD ["./cmd.prod.sh"]