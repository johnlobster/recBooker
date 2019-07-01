# recBooker

App for making bookings of city recreational facilities, administrating facilities and summarizing bookings for each facility

### Developers

* Michael Sender
* Filmon Habtu
* Rob Ross
* John Webster

## Travis CI integration

This is simple until a mySQL database needs to be installed

### mysql setup

`.travis.yml` changes

1. Add mysql as a service (`services: mysql`)
1. Initial mysql database (`before_install: mysql -u root --password="" < db/travis.sql`)
This uses the `mysql` cli to run the `db/travis.sql` sql script. On set, root password is "", so this will enter mysql with root privileges. Travis does not allow the app to communicate with mysql using root with no password. The `travis.sql` therefore creates a user with a password, and then creates the database.
1. Set up application so that when in travisCI it uses sql user name, password and database name. there are many different ways to do this. I chose to add a "travis" setup to the `configs/config.json` file, and have `models/index.js` recognize travis environment and set the database config accordingly. Note that it is not important to keep the travis setup secure, as it is only used whilst travis runs the test suite. The travis `.travis.yml` file sets a variable (`env: RUN_TRAVIS_CI=0`), which and is read by `models/index.js` and used when reading config file

`.travis.yml` file (check into github)

``` .yml
language: node_js
node_js: 10
services:
  - mysql
branches:
  only:
  - master
cache:
  directories:
    - node_modules
env: 
  - RUN_TRAVIS_CI=0
before_install:
  - mysql -u root --password="" < db/travis.sql 
```

`db/travis.sql` (check into github). This is specific to my repo, can change names etc.
``` .sql
-- sql script file run before starting travis
-- creates a user for travis and creates recbooker_db
CREATE USER 'recBookerUser'@'localhost' IDENTIFIED BY "12345678";
GRANT ALL ON *.* TO 'recBookerUser'@'localhost';
DROP DATABASE IF EXISTS recbooker_db;
CREATE DATABASE recbooker_db;
```

`config/config.json` additional setup (check into github).This is specific to my repo, can change names etc.
```
  "travis": {
    "username": "recBookerUser",
    "password": "12345678",
    "database": "recbooker_db",
    "host": "localhost",
    "dialect": "mysql"
  }
```
### testing

travis runs every time something is checked into master branch and whenever a pull request is made. If you want to 
test it out before making the pull request, you can add the branch name to the `.travis.yml` file

```
branches:
  only:
  - master
  - <your branch name>
```


## Heroku deployment

### deploying branches as well as master

See <https://devcenter.heroku.com/articles/multiple-environments>

Because master on github is locked, cannot make changes to master and check whether they work on heroku. To fix this, you can create another heroku environment, called staging for instance (assuming you are logged on to heroku)
```
heroku create --remote staging
```
If you have more than one heroku remote then you have to specify which one you want by adding `-r` or `--remote` to commands. You can set up default with
```
git config heroku.remote staging
```
You will want to change that back to master when you are ready to deploy to master.
When your branch is ready to deploy, push it to github as usual, then you can push to heroku
```
git push staging <branch name>:master
```
Heroku will then work as usual. ( `<branch name>` means the name of the branch you are deploying)

### mysql setup

You have to set up the mysql database (JAWS) in heroku before your application will access the database.
Instructions are in the class repo
`UCDVSAC201903FSF2/14-handlebars/03-Supplemental/MySQLHerokuDeploymentProcess.pdf`

However, you don't need to set up the tables as sequelize will do that for you
I did have to `use` the database before sequelize would create the tables

For example, in mysqlWorkbench
```
use g2lb1lxliflknnmf;
```

Remember that this is a one time setup and the database does not need to be recreated when you push a new version to heroku





