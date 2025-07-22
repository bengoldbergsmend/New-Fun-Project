# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the top-level package.json and package-lock.json
COPY package*.json ./

# Install top-level dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Set the working directory for the React app
WORKDIR /app/my-amazing-site

# Install frontend dependencies
RUN npm install

# Build the React app for production
RUN npm run build

# The container doesn't need to run for the scan, just be buildable.
# If it were to be run, a CMD line would be here. 