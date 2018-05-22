# Build the Image
- http: `sudo docker build --tag http:3.0.0 http/`
- mongodb: `sudo docker build --tag mongodb:1.0.0 mongodb/`

# Run the Container
- mongodb:
  - `sudo docker network create docker_ws`
  - `sudo docker volume create mongodb_data`
  - `sudo docker volume create mongodb_config`
  - `sudo docker run --name mongo --detach --mount type=volume,source=mongodb_data,target=/data/db --mount type=volume,source=mongodb_config,target=/data/configdb --publish 127.0.0.1:27017:27017 --net docker_ws mongodb:1.0.0`
- http: `sudo docker run --name http --tty --interactive --mount type=bind,source=$(realpath http/sources),target=/docker_ws --net docker_ws http:3.0.0`
