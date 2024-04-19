FROM node:20-alpine

# Set working directory for running commands
WORKDIR /home/node/app

# Set working directory for running commands
RUN chown -R node:node /home/node/app

# Copy package file into container
COPY package.json ./

# Switching user from root to node
USER node

# Installing deps
RUN npm install

# Give node user permissions and copy code files over
COPY --chown=node:node . .

# Expose port where application runs
EXPOSE 5000

# Run application
CMD npm run serve
