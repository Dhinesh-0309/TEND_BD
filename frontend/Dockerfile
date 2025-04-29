FROM node:18

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

RUN npm install

# Now copy the rest of the code after installing dependencies
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
