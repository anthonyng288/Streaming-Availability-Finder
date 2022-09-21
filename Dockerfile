FROM node:16


# Set basic AWS credentials and API Key variables
ENV AWS_ACCESS_KEY_ID XXID
ENV AWS_SECRET_ACCESS_KEY XXSECRET
ENV AWS_SESSION_TOKEN XXTOKEN
ENV MY_API_KEY_1 YYKEY1
ENV AWS_SDK_LOAD_CONFIG=


# Copy the application folder inside the container
COPY . /src
# Set the default directory where CMD will execute
WORKDIR /src


COPY package*.json ./

RUN npm install

EXPOSE 3000
# Set the default command to execute when creating a new container
CMD ["npm", "start"]