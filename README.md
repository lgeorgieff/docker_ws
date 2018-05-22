# Build the Image
`sudo docker build --tag http:2.0.0 http`

# Run the Container
`sudo docker run --name http --tty --interactive --mount type=bind,source=$(realpath http/sources),target=/docker_ws http:2.0.0`
