# Stage 1: Build the Angular app
FROM node:20 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the Angular app
RUN ng build --prod

# Stage 2: Create a minimal Nginx image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app from the builder stage to the final image
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
