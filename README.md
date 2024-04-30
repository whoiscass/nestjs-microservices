## Description

stack: nestjs, kafka, mongodb

## tech debt
validaciones en schemas y error handling

## Installation

```bash
$ cd api-gateway && npm i
```

```bash
$ cd fraud && npm i
```

## Running the zookeeper, kafka and mongodb containers

```bash
# development
$ docker compose up --build -V
```

## Running api-gateway nestjs app

```bash
# development
$ cd api-gateway && npm run start:dev
```

## Running fraud nestjs app

```bash
# development
$ cd api-gateway && npm run start:dev
```
