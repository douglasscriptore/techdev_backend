FROM node:lts-alpine
RUN mkdir -p /home/node/backend/node_modules && chown -R node:node /home
WORKDIR /home/node/backend
COPY package.json babel.config.json ormconfig.ts yarn.* ./
USER node
COPY --chown=node:node . .
RUN chmod +x /home/node/backend/init.sh
RUN yarn
EXPOSE 3333
ENTRYPOINT ["./init.sh"]
