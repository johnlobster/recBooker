// support function - reads a file of SQL queries and sends them to the database
// one at a time
// useful for executing seed file for testing/development

fs = require("fs");

// reads file and parses into an array of lines - returns promise
function readFilePromise(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if(err) {
                console.log("Error reading file " + fileName);
                reject(err);
            }
            else{
                // break data down into lines, remove \r
                resolve(data.toString().split("\n")
                .map((line) => {
                    return line.replace(/\r/g, "");
                })
                .filter( (line) => { // sql cannot accept a blank query
                    return line !== "";
                }));
            }
        });
    });

}

// test
// readFilePromise("./db/seed.mysql")
//     .then((data) => {
//         console.log(data);
//     })
//     .catch( (err) => {
//         console.log(err);
//     });

// read .sql file and execute array of commands in mysql database. Returns promise
module.exports = function( dataBase, fileName) {
    return new Promise((resolve, reject) => {
        readFilePromise(fileName)
        .then( (sqlCommands) => {
            // reduce method can be used to execute promises in sequence
            sqlCommands.reduce( (previousPromise, query) => {
                return previousPromise.then(() => {
                    console.log("Running query " + query);
                    return dataBase.sequelize.query(query)
                });
            }, Promise.resolve());
            resolve();
        })
        .catch( (err) => {
            console.log("Error in executeSQLFile");
            console.log(err);
            reject(err);
        });
    });
}