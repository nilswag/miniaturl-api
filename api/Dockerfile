# Use an official Node.js base image
FROM node:22-alpine

# Set working directory for inside the container
WORKDIR /app

# Copy package.json and package-lock.json (using Docker building cache)
COPY package*.json .

# Install project packages based on NODE_ENV
ARG NODE_ENV="production"
RUN if [ "${NODE_ENV}" = "production" ]; then npm install --omit=dev; else npm install; fi
ENV NODE_ENV=${NODE_ENV}

# Copy the rest of the project files
COPY . .

# Expose the port where the application will run
EXPOSE 5000

# Set the container run command
CMD [ "sh", "-c", "if [ \"${NODE_ENV}\" = \"production\" ]; then npm start; else npm run dev; fi" ]