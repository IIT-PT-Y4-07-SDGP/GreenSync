FROM node:20.11.0
ENV PORT=5001
RUN addgroup --gid 10014 choreo && \
    adduser  --disabled-password --uid 10014 --ingroup choreo choreouser
USER 10014
WORKDIR /app
COPY package*.json ./
RUN npm clean-install
COPY . .
EXPOSE 5001
CMD [ "node", "index.js"]
