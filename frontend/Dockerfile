ARG NODE_VERSION=16.14.2
ARG NODE_ENV=production

FROM node:${NODE_VERSION} as base
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app/
ENTRYPOINT ["/app/entrypoint.sh"]

# Development stage
FROM base as development
ENV NODE_ENV=development
CMD ["npm", "run", "start"]

# Production stages (default)
FROM base as build
ENV NODE_ENV=production
RUN npm run build

FROM nginx:1.22-alpine as production
WORKDIR /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/entrypoint.sh /app/
CMD ["nginx", "-g", "daemon off;"]
ENTRYPOINT ["/app/entrypoint.sh"]
