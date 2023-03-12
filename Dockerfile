FROM node:19

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD [ "npx", "serve", "-s", "build" ]