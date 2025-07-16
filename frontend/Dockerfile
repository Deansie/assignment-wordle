FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5081
CMD ["npx", "serve", "-s", "dist", "-l", "5081"]