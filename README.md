# tech-back

> An email app, which accepts the necessary information to send emails.

## Problem & Solution
This app solves the problem of an email client. It provides a simple, easy to use
interface with support for offline work.

The solution is split across two repos, this one (the back end) and the [front end](https://github.com/willtpwise/tech-front). It's a full-stack solution, however
the back end is in its infancy.

The back end uses [Node.js](https://nodejs.org/en/), along with:
1. [Express](https://expressjs.com/) for bootstrapping the API
2. [Axios](https://github.com/axios/axios) for HTTP requests

Collectively, they interact with [Mailgun](https://www.mailgun.com/) and
[SendGrid](https://sendgrid.com/) to distribute emails. Mailgun is the primary and
SendGrid is the backup.

I chose Node.js because it's the same language as my front end. This helped keep
my development workflow smooth and in sync.

Express was the fastest and simplest way to setup my API and local testing server.

Axios is mirrored on the front end for handling HTTP requests. It's a great package
and it's API is very easy to use.

## Build Setup
``` bash
# create a config.json file with the API credentials
# ask me for the contents. Structure is as per config-sample.json
touch config.json

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start
```
Now clone, install and run the [front end](https://github.com/willtpwise/tech-front)

## API Requests
This repo exposes a RESTful API. At the stage, it offers one endpoint.

### /messages
The messages endpoint is the main endpoint for emails.

The create method accepts `POST` requests to the `/messages` endpoint.

#### Request
```shell
curl -X POST <api base>/messages -H "Content-Type: application/json" -d '{"to":["test@test.net"],"cc":["test@test.com"],"bcc":["test@test.com"],"subject": "Test", "body": "Test"}'
```
#### Response
The response will be a JSON object with a single property – `status`, indicating
whether the email was sent.
```json
{
  "status": true
}
```
