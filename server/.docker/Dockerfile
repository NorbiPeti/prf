FROM node:lts

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
EXPOSE 3000

RUN apt-get update && apt-get install wait-for-it

ENTRYPOINT [ "/start.sh" ]

COPY start.sh /start.sh
RUN chmod +x /start.sh
