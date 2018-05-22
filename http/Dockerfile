FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
    node.js \
    npm \
    emacs

RUN mkdir -p /projects/docker_ws
COPY ./sources /projects/docker_ws

RUN mkdir /docker_ws

WORKDIR /docker_ws

CMD node /projects/docker_ws/
