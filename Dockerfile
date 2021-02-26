FROM node:12.12.0

ADD . /workspace

WORKDIR /workspace

RUN npm install

COPY . /workspace

EXPOSE 3001

ENV TZ America/New_York

CMD npm start
