# Stage 1: Build the Angular app using a Node.js image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the remaining project files
COPY . .

# Build the project for production
RUN npm run build:prod

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration (Optional, using default for now but you can add custom config here)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built artifacts from the build stage to Nginx's serving directory
COPY --from=build /app/dist/luxelle-landing-page /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
