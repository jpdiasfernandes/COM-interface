FROM node:20-bullseye
WORKDIR /app/interface
COPY . .
COPY ssl.cer .
COPY ssl.key .
RUN npm install
EXPOSE 7778
CMD ["npm", "start"]