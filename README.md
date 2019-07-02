# recBooker

App for making bookings of city recreational facilities, administrating facilities and summarizing bookings for each facility

### Developers

* Michael Sender
* Filmon Habtu
* Rob Ross
* John Webster

### Who, What are they doing,
### Concept
recBooker is a app and website that helps eliminate the common problem associated when individuals or sports team rent a sport field or party gazebo only to find when they arrive at their assigned time there is already someone using the field or gazebo. This creates an awkward situation where the party that rented the facility has to confront the party using the facility to ask them to leave. recBooker can help lessen or solve this issue by presenting information that confirms the rental of the facility by the correct party.

### Features:
    Front End:
		
<b>Entry Interface:</b> There will be an entry interface which allows the operator to “book” a facility for a particular party on a set day and time frame.  The interface will also allow you to update and delete the entry if needed.
		
<b>Facility Chooser Interface:</b> This interface will display all of the facilities as individual buttons.  When the user chooses a facility the screen will go to a separate URL where we pass the :facilityName to the API to display the information on the people who rented the facility.
		
<b>Facility Display Screen:</b> This screen will allow the user to choose a date and will then display the information of all of the parties that have rented that facility for that chosen day.

### Technologies:
* Javascript
* Express
* Sequelize
* Handlebar
* Bootstrap

### New technology - sessions

This uses
* `cookie-parser`
* `cookie-session`

A detailed explanation can be found at [Sessions](./docs/Session.md)

### Heroku deployment


### Git hub repository

<https://github.com/johnlobster/recBooker>

### Build development environment

clone the master repo, cd to `recBooker` directory

`npm install` will install all the node modules

create a `.env` file (not tracked by git) and add the following using editor
```
DEV_MYSQL_USER="<your user name for mysql server>"
DEV_MYSQL_PASSWORD="<your password to mysql server>"
NODE_ENV ="development"
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

to clear database and seed it, add
```
DEV_MYSQL_FORCE_DB_RESET=0
```
to `.env` file

to run application
`node server`
or
`npm run start`

### Continuous integration and linting

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
