FROM node:20-bullseye
WORKDIR /app/interface
COPY . .
RUN npm install
EXPOSE 7778
CMD ["npm", "start"]