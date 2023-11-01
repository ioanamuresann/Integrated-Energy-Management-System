# Use an appropriate Node.js version
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app source code
COPY . .

# Build the Angular app
RUN ng build --configuration=production

# Expose the port your Angular app runs on (e.g., 80)
EXPOSE 4200

# Run the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]