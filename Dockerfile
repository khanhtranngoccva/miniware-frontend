FROM node:latest
LABEL authors="Admin"

WORKDIR /application
COPY ./package.json /application
RUN npm install
COPY ./ /application

ENTRYPOINT ["npm", "run", "dev"]
