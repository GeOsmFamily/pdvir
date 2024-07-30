FROM node:lts-alpine AS vue_base

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000

# for Development environnement
FROM vue_base AS vue_dev

CMD [ "yarn", "dev", "--port", "3000", "--host", "0.0.0.0" ]

# for Production environnement
FROM vue_base AS vue_prod

RUN yarn build