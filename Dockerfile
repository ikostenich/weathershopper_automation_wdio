FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV ALLURE_VERSION=2.21.0

RUN apt-get update && \
    apt install default-jdk -y && \
    apt-get install -y allure
RUN wget https://github.com/allure-framework/allure2/releases/download/${ALLURE_VERSION}/allure_${ALLURE_VERSION}-1_all.deb
RUN dpkg -i allure_${ALLURE_VERSION}-1_all.deb

COPY . .

CMD npm run test && allure serve /app/allure-results