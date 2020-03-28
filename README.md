# Back-applications

This application provides client interaction with the blockchain network. Among the required dependencies in the file packaje.json are "fabric-ca-client" and "fabric-network". These are the Node.js SDK tools for working with a Hyperledger Fabric network.

In order to install the application, you need to clone the project on the server on which the Hyperledger Fabric network is located:
```
cd ~
git clone https://gitlab.nixdev.co/poc-blockchain/back.git
```
and install the dependencies:
```
cd back
npm install
```
## Creating Database Tables

It is necessary to connect to the database:
```
vim ~ / back / config / config.json
```
Here you need to assign the key "host" the correct value.

Our application has prepared migrations and seeds. You need to run them:
```
npx sequelize-cli db: migrate
npx sequelize-cli db: seed: all
```
## Application launch

Set exports.hostName to constants.js (value for the current server):
```
vim ~ / back / constants.js
```
Now you need to run the command:
```
npm start
```
The back / services / folder contains methods that interact with the network using the Node.js SDK.

For a complete understanding of the role of this application in the Child Medical Record project, refer to the [article](https://www.google.com).