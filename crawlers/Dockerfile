
FROM node:12.16.2


RUN useradd --user-group --create-home --shell /bin/false app &&\
    npm install --global npm@6.14.4
ENV HOME=/home/app
COPY package.json npm-shrinkwrap.json $HOME/crawlers/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/crawlers/
RUN npm install --silent --progress=false

USER root
COPY . $HOME/crawlers
RUN chown -R app:app $HOME/*

#Atualizando puppeteer por conta de Troubleshooting
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

USER app
CMD ["node", "index.js"]



