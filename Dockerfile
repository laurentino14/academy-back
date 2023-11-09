FROM node:alpine3.18

# Create app directory

WORKDIR /app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source

COPY . .

# Building app

RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]