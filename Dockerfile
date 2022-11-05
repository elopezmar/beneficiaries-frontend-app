# Build stage

FROM node:18 as build-deps
WORKDIR /app
COPY . ./
RUN npm i
RUN npm run build

# Deploy stage

FROM nginx:alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /app/build /usr/share/nginx/html
RUN apk update && apk add bash
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]