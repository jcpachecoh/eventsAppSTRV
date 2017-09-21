# React Graphql Grapgcool app for manage events



## Quickstart


### 1. Clone example repository

```sh
git clone https://github.com/jcpachecoh/eventsAppSTRV.git
cd eventsapp
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Instagram schema
graphcool init --schema https://graphqlbin.com/events.graphql 
```

This creates a GraphQL API for the following schema:


### 3. Connect the app with your GraphQL API

Copy the `Simple API` endpoint to `./src/index.js` as the `uri` argument in the `createNetworkInterface` call:

```js
// replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
const networkInterface = createNetworkInterface({ uri: '__SIMPLE_API_ENDPOINT__' })
```

### 4. Install depdendencies & run locally

```sh
yarn install
yarn start # open http://localhost:3000 in your browser
```

### 5. Login with one of the next usernames


Username
Password
brucebanner@strv.com
kill3r
blackwidow@strv.com
l0veLateX
thor@strv.com
missMyBroth3r
peterparker@strv.com
hat3Spid3rs
steverogers@strv.com
am3riCa
buckybarnes@strv.com
darkS0ldier
tonystark@strv.com
ir0nL0ver


