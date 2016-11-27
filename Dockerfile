FROM ubuntu:16.04

MAINTAINER Sam L. <esayemm@gmail.com>

# Install programs
RUN apt-get update
RUN apt-get install -y nginx redis-server
RUN apt-get install -y nodejs-legacy npm

# Install specific node version
RUN apt-get install -y curl
RUN npm install -g n
RUN n 6.9.1

WORKDIR app
ADD . .

# Install kubectl
RUN curl -L -o ./kubectl https://storage.googleapis.com/kubernetes-release/release/v1.4.0/bin/linux/amd64/kubectl
RUN chmod -R +x ./kubectl
RUN mv ./kubectl /usr/bin

EXPOSE 8080
CMD ./scripts/setup-kubectl.sh && redis-server --daemonize yes && NODE_ENV=prod node index.js
