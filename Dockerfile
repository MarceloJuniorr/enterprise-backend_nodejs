FROM node:16.14-alpine as base
WORKDIR /app
EXPOSE 3000
ENTRYPOINT yarn install --frozen-lockfile && yarn run dev

# Builds the static application
FROM base as build
COPY app /app
COPY app/prisma ./app/prisma/
RUN yarn install --frozen-lockfile
RUN yarn prisma generate
RUN yarn run migration
RUN yarn run dev
