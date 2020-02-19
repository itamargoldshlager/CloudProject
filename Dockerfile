FROM node:12
WORKDIR /home/ec2-user/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD [ "node", "src/server"]

