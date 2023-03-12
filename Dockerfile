FROM node:19

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD [ "npx", "serve", "-s", "build", "-p", "3000"]