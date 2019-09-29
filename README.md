# Introduction

This project enables the development of APIs with NodeJS.

## Invocation

## Installation

Clone this repository and then change the remote to your repository.

```bash
git clone
git 
```

## Usage

### Folder structure

## Development - pre-requisites

### OS requirements

The logging mechanism in this project outputs a time-stamp. To ensure that, the timestamp matches a specific timezone, the operating system must expose timezone for `moment.js` to consume. Typically, this happens with a `TZ` environment variable set to e.g. `Asia/Kolkata`.

### Secure transport

The design decision for securing the communication betwen this server and a client is to have TLS communication terminated _before_ it hits this server. Such a TLS termination maybe done with e.g. `Nginx` where, load balancing may also be set-up.

## Development

The following guidelines changes may be applied for project files.

### `index.js`

1. Change `logger.info` message in `run()` for different message before starting up the server.
2. All configuration is received as a JSON object from an environment variable `APP_CONFIG`. This variable name maybe changed as required.
3. During start-up, `index.js` will establish connection to a cache (e.g. Redis) in `cache/connect.js` and a authorisation server (e.g. LDAP) in `auth/connect.js`. If more connections are needed then, create the following as shown in examples below. The connection configuration should be added into the `APP_CONFIG` environment variable.
   1. `db/connect.js` - For connecting to an RDBMS e.g. Postgres
   2. `msg/connect.js` - For connecting to a messaging system e.g. Kafka

### `routes/app.js`

1. More middleware maybe added as required.
2. Each middleware maybe edited as required.
3. For an end-point such as `app.get('/services)`, the following is expected: **Note** that, the file name matches the REST resource to enable traceability.
   1. `mw/mservices.js` - Payload specific checks.
   2. `routes/rservices.js` - Entry-point for business logic.
   3. `utils/uservices.js` - Helper functions for business logic.
   4. `cache/cservices.js` - Cache queries (CRUD) to be invoked by any of the above.

