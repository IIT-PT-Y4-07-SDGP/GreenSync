# Stage 1: App Build
FROM node:16.10.0 as builder
USER 10001
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build --prod

# Stage 2: Create a minimal Nginx image to serve the Angular app
FROM nginx:alpine
USER 10001
COPY --from=builder /app/dist/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
