# ---- Build ----
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
RUN apk add --no-cache git
RUN npm i -g typescript
COPY ["package.json","yarn.lock", "./"]
RUN yarn
COPY . .
RUN yarn build
RUN rm -r node_modules
RUN yarn install --production

# ---- Release ----
FROM node:lts-alpine AS release
WORKDIR /usr/src/app
COPY . .
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
EXPOSE 3001