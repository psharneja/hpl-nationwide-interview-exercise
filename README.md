# HPL Task

**Common Improvements**
- Using Lerna for better monorepo management

## Frontend (in client directory)

****
**Description**
- UI for saving, editing, fetching details related to properties available uploaded by different users
**By default, runs on port 3000**

**Techs**

- React.js
- Next.js (SSR)
- Chakra UI
- CodeGen (Graphql types generation)
- EsLint
- Typescript
- Formik (forms)
- Urql (Graphql consumer)
- 

- yarn/ npm install: install dependencie
- yarn lint : clear linting errors
- yarn build: create next.js production build
- yarn dev: to run watch server for in dev environment

*dependencies*
- requires server to be running on port 4000 of localhost as of now.


**Improvements to be done** 
- Unit Testing
- Better Session/ Cookie Handling
- Improving UI
- Docker Container
- Setting environment variables for api address/ port and UI port
****
****

## Backend (in server directory)

**requires '.env' file with properties as mentioned in '.env.example' file**

GraphQL api for saving, retriving, updating details of users and the properties details' uploaded by users.
DB creation done by ORM automatically in non-prod environments, sql queries provided in migration folder.

**Techs**
- Express JS
- Apollo Graphql
- TypeOrm (DB ORMs)
- Typescript
- Jest
- Argon (encryption)
- eslint

**Dependencies**

- postgresSQL DB
****

1. Run PostgresDB
2. createdb
3. ADD db details urlto env file and run


- yarn/ npm install :  to install dependencies 
- NODE_ENV=production yarn start:prod :  to run prod build and run on node
- yarn test:unit : run unit tests
- yarn test:unit --coverage : to run unit tests and see test coverage
- yarn dev - to run dev environment
- or create image and run docker container(Dockerfile included)

**Improvements to be done** 
- Better/ Thorough Unit Testing
- Running behind nginx reverse proxy
- Add Docker compose for dependencies
- Handling Session on Backend either by using im-memory DBs or jwts
****
****


# check https://psharneja.page for details about the developer
# this code will be published to https://penguincodes.co.uk
