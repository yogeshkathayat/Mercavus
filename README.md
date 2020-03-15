# Mercavus
Mercavus Backend Challenge

## Requirements

## Built With
- Node.js (v12.14.1)
- Typescript
- Express
- Mongoose
- Jest with Supertest for unit testing and coverage

## RUNNING APP WITH DOCKER
Docker & docker-compose must be installed

```bash
$ docker-compose up --build
```

## RUNNING APP WITHOUT DOCKER

## Dependency Installation

```bash
$ yarn 
```
## Running the app

```bash
# copy env.example to env
$ cp .env.example env

change MONGODB_URL to your mongodb instance connection URL (Mongodb should be installed and running)

# build app
$ yarn build

# start app
$ yarn start

```
## Testing the app

```bash
# unit tests with coverage
$ yarn test

```

## Docs

```bash
# api doc
$ yarn docs

```



## unit tests with coverage report

![Unit Test with coverage](https://github.com/yogeshkathayat/Mercavus/raw/master/test-coverage.png)
