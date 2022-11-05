# Beneficiaries Frontend App

## Setup

In order to run and deploy the project, you need to install the following dependencies:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node 18](https://nodejs.org/en/)
- [Beneficiaries Backend App](https://github.com/elopezmar/beneficiaries-backend-app)

## Run app in development mode

Run `Beneficiaries Backend App` in development mode, and in `Beneficiaries Frontend App` project root path, perform the following:

- Execute `npm install` to install project dependencies
- Execute `npm start` to start the app with hot reload enabled
- In a web browser, go to [http://localhost:3000/login](http://localhost:3000/login)
- Login to the app with the default user created by `Beneficiaries Backend App`:
    - username: `admin`
    - password: `password`

## Deploy production build

Run `Beneficiaries Backend App` in development mode, and in `Beneficiaries Frontend App` project root path, perform the following:
- Deploy `Beneficiaries Backend App` production build
- Execute `docker compose up -d` to deploy production container in Docker
- In a web browser go to [http://localhost:3001/login](http://localhost:3001/login)
- Login to the app with the default user created by `Beneficiaries Backend App`:
    - username: `admin`
    - password: `password`
