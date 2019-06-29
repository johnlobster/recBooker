// html is passed in as a string (rendered using handlebars). In reality 
// pretty hard to test. Just trying some basics

const chalk = require("chalk");

module.exports = function(htmlString) {
    var fail = true;
    var message = "HTML errors\n"; // only displayed if a test fails

    var modHtmlString = htmlString
        .toString()                        // to a string just in case
        .replace(/\r/g, "")                // remove carriage returns
        .replace(/\n/g, "")                // remove new line
    ;

    // 1. contains <!DOCTYPE html>
    var expr = new RegExp(/^\s*<\s*!DOCTYPE\s+html\s*>/,"i");

    fail = ! expr.test(modHtmlString);
    if(fail) message += "No !DOCTYPE\n";

    // 2. contains beginning and end <html> tags
    // expr = new RegExp(/<html>.*<\/html>/,"i","s");
    expr = new RegExp(/<html>.*<\/html>/, "i", "s");
    if (! expr.test(modHtmlString)) {
        fail = true;
        message += "enclosing html tags not found\n";
    } 

    return {fail: fail, msg: chalk.red(message)};
}