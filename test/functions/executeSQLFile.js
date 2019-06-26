// support function - reads a file of SQL queries and sends them to the database
// one at a time
// useful for executing seed file for testing/development
// returns promise

fs = require("fs");

// reads file of SQL commands and parses into an array of lines - returns promise
function readFilePromise(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if(err) {
                console.log("Error reading file " + fileName);
                reject(err);
            }
            else{
                // break data down into query lines, remove \r\n, strip out empty lines (mySQL doesn't accept)
                resolve(data
                  .toString()                        // convert file buffer to a string
                  .replace( /--.*\r*\n+/g, "")        // strip out comment lines
                  .replace( /\r*\n*/g,"")            // remove carriage returns
                  .split(";")                        // split into array of SQL queries
                  .filter( (str) => {return str !== ""  })  // get rid of blank lines
                  .map((str) => { return str + ";" }) // add terminating ; to each query
                );
            }
        });
    });

}

// test
readFilePromise("./db/seed.mysql")
    .then((data) => {
        console.log(data);
    })
    .catch( (err) => {
        console.log(err);
    });

// read .sql file and execute array of commands in mysql database. Returns promise
module.exports = function( dataBase, fileName, run) {
    return new Promise((resolve, reject) => {
        if (run) {
            readFilePromise(fileName)
            .then( (sqlCommands) => {
                // reduce method can be used to execute promises in sequence
                sqlCommands
                .reduce( (previousPromise, query) => {
                    return previousPromise
                    .then(() => {
                        // console.log("QUERY = " + query);
                        return dataBase.sequelize.query(query);
                    });
                    }, Promise.resolve()) // Promise.resolve is the initial value to .reduce
                .then( () => {
                    // console.log("All queries completed");
                        resolve();
                    });
            })
            .catch( (err) => {
                console.log("Error in executeSQLFile");
                console.log(err);
                reject(err);
            });
        }
        else {
            // not running so resolve with empty options. Still a promise but no asychronous behaviour
            // console.log("No SQL seed");
            resolve();
        }
    });
}