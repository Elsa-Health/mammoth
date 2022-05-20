# installing Go-ipfs
# Need feature for setting up private network
FROM ipfs/go-ipfs:latest

LABEL description "Created this instance for the sake of having private network"

# copy swarm key for the elsa network
COPY network-swarm.key /data/ipfs/swarm.key

RUN mkdir -p /data/ipfs

ENV IPFS_PATH /data/ipfs
ENV IPFS_SWARM_KEY /data/ipfs/swarm.key

EXPOSE 4001/tcp
EXPOSE 4001/udp
EXPOSE 5001
EXPOSE 8001

# create IPFS repo
# run the server
RUN ipfs daemon --init --enable-pubsub-experiment

# Connecting with local computer for testing. Might want to remove this in the future
RUN ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:5001", "http://localhost:3000", "http://127.0.0.1:5002"]'
RUN ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'
