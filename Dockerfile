FROM node:18.18.2

# Create app directory

WORKDIR /app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source

COPY . .


# Prisma Gen

RUN npx prisma generate




# Building app

RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]