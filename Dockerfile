FROM node:18.18.2

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

# Install
RUN npm install

# Bundle app source
COPY . .

RUN rm -rf mongo
RUN rm -rf dist
# Prisma Gen
RUN npx prisma generate


# Building app
RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]