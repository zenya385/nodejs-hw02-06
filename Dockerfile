FROM node

WORKDIR /srс/app 

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "src/server"]
