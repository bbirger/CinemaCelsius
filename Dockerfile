FROM node:latest

RUN npm install -g serve

RUN mkdir -p /app
WORKDIR /app

# build dependencies first
COPY package.json package.json
RUN npm install

# copy remaining source code
COPY . .
RUN npm run build --production

EXPOSE 5000
CMD serve -s build