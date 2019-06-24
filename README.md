# recBooker

App for making bookings of city recreational facilities, administrating facilities and summarizing bookings for each facility

### Developers

* Michael Sender
* Filmon Habtu
* Rob Ross
* John Webster

### Technologies

### Git hub repository

<https://github.com/johnlobster/recBooker>

### Build development environment

clone the master repo, cd to `recBooker` directory

`npm install` will install all the node modules

create a `.env` file (not tracked by git) and add the following using editor
```
DEV_MYSQL_USER="<your user name for mysql server>"
DEV_MYSQL_PASSWORD="<your password to mysql server>"
```

Initialize mysql server: (only needs to be done once)

Use mysql workbench to load and execute the following files
```
db/databaseSchema.mysql
db/testDatabaseSchema.mysql
```
or use mysql at command line
```
mysql -u root -p
Enter password: **********
....
mysql>
mysql> source db/databaseSchema.mysql;
mysql> source db/testDatabaseSchema.mysql;
mysql> exit
```

(coming soon - option to clear database and seed it)

to run application
`node server`
or
`npm run start`

### Continous integration and linting

##### eslint

* `.eslintrc.json` modified to support es6 syntax
* `.eslintignore` ignores anything in `node_modules` or `test` directories. Ignoring `test` is necessary because eslint not supporting mocha (may get fixed later)
Eslint can be run on a single file with either of the following
```
npx eslint <file>
npm run lint <file>
```

##### Travis

Travis links into the github repo and runs based on the configuration file `.travis.yml` It runs every time something is checked into the github master. Can check other branches by adding the branch name to the  `branches: only: ` field.

It runs the 
```
"scripts": { test: "npm run lint && cross-env NODE_ENV=test mocha test -u bdd --reporter spec --exit" }
```
command. This runs eslint on all `.js` files in the directory (other than those in `.eslintignore` ) and in parallel runs all the mocha tests in the `test` directory.

You can check for compliance before making pull request by running
```
npm test
```
which runs the same code in your local environment


### File structure

(excludes `.git/` and `node_modules/`)

``` bash
|-- recBooker
    |-- .env
    |-- .eslintignore
    |-- .eslintrc.json
    |-- .gitignore
    |-- .travis.yml
    |-- API_DEFINITION.md
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- server.js
    |-- config
    |   |-- config.json
    |-- db
    |   |-- databaseSchema.mysql
    |   |-- seed.mysql
    |   |-- testDatabaseSchema.mysql
    |-- models
    |   |-- example.js
    |   |-- index.js
    |-- public
    |   |-- js
    |   |   |-- index.js
    |   |-- styles
    |       |-- styles.css
    |-- routes
    |   |-- apiRoutes.js
    |   |-- htmlRoutes.js
    |-- test
    |   |-- canary.test.js
    |   |-- mocha.opts
    |   |-- modelTester.js
    |   |-- functions
    |       |-- executeSQLFile.js
    |-- views
        |-- 404.handlebars
        |-- example.handlebars
        |-- index.handlebars
        |-- layouts
            |-- main.handlebars
```
