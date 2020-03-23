```
cd network
```

```
npm install
```

#### necessary to assign the address of the server with DB to the "host" variable.

```
vim ~/back/config/config.json
```

#### edit exports.hostName in constants.js (value for the current host):

```
vim ~/back/constants.js
```

#### create tables

```
npx sequelize-cli db:migrate
```

#### create info

```
npx sequelize-cli db:seed:all
```

#### run app

```
npm start
```

#### generate users and admins. {org} == parents, hospital or kindergarten. (To EC2 with "parents", "hospital", "kindergarten")

```
cd generators
./userGenerator.sh {org}
```

#### generate two cards (from EC2 with "parents")

```
node setCards.js
```

#### create agreement (from EC2 with "parents")

```
node createAgreement.js
```

#### sign agreement (from EC2 with "hospital")

```
node signAgreement.js
```
