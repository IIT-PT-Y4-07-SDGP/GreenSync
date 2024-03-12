FROM node:20.11.0
RUN addgroup --gid 10014 choreo && \
    adduser  --disabled-password  --no-create-home --uid 10014 --ingroup choreo choreouser
WORKDIR /app
COPY package*.json ./
RUN npm clean-install
COPY . .
EXPOSE 8081
CMD [ "node", "server.js" ]
