FROM node:lts

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ENTRYPOINT [ "/start.sh" ]

COPY start.sh /start.sh
RUN chmod +x /start.sh
