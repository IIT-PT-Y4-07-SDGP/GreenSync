# Stage 1: App Build
FROM node:16.10.0 as builder
RUN addgroup --gid 10014 choreo && \
    adduser  --disabled-password  --no-create-home --uid 10014 --ingroup choreo choreouser
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@13.3.11
RUN npm install
COPY . .
RUN ng build --prod

# Stage 2: Create a minimal Nginx image to serve the Angular app
FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html/
EXPOSE 80
