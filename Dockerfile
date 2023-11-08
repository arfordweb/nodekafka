# specify the node base image with your desired version node:<version>
FROM node:20
# replace this with your application's default port
#EXPOSE 8888

RUN npm install -g nodemon

# already declared in parent image
WORKDIR /home/node/app

COPY package.json .

RUN npm install


# copy the nodekafka repo (including built assets) to the WORKDIR
COPY . .


# expose the port we're using for a service (which we have none yet)
#EXPOSE 4000

CMD ["npm", "run", "start"]
