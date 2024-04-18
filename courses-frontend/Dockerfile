FROM node:20-alpine

# Set working directory for running commands
WORKDIR /home/node/app

# Give node user permissions and copy code files over
COPY --chown=node:node . .

# Installing deps
RUN npm install

# Switching user from root to node
USER node

# Expose port where application runs
EXPOSE 5000

# Run application
CMD npm run serve
