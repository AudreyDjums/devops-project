# Stage 1: Build the React application
FROM node:24-alpine AS build

WORKDIR /app

# Install dependencies using the lockfile
COPY package.json package-lock.json ./
RUN npm ci

# Copy the source and generate the production build
COPY . .
RUN npm run build

# Stage 2: Serve the built application
FROM nginxinc/nginx-unprivileged:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Run the web server as a non-root user
USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]