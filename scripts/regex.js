/* lexer.js */

// A few global variables
var regex = "";

var newPattern = null;

var input = null;

function grabInput() {
    // Grab the "raw" source code.
    var call = document.getElementById("manualData").value;
    // Trim the leading and trailing spaces.
    call = trim(call);
    // TODO: remove all spaces in the middle; remove line breaks too.
    return call;
    // document.getElementById("shell").value = call;
}

function analyzeCall() {
    // Sort of a lexical analysis of the actual call itself

    // Clean up the shell before we analyze each call
    // and return more output
    document.getElementById("shell").value = "";

    // Set some of our needed variables
    tokenSequence = [];

    regex = document.getElementById("regex").value;

    // Make sure we have valid regex entered
    try {
        newPattern = new RegExp(regex);
        // console.log(newPattern.test(document.getElementById("manualData")));
        storeRegex(regex);
        /*
        *   TODO: Create an NFA based on the regular expression
        */

        // Begin to analyze the input
        testInput();
    }
    catch (err) {
        grepyOutput("Invalid regular expression entered.");
    }

}

function testInput() {
    // Grab the input data
    input = grabInput();
    /*
    *   TODO: Test the input data against the NFA
    */

}

function storeRegex(tempRegex) {
    // Set the current index to 0
    var index = 0;

    for (index; index < tempRegex.length; index++) {

        var currentToken = tempRegex[index];
        addToken(currentToken);
        console.log(tokenSequence);
        // add this token to the sequence
        grepyOutput("Found [" + currentToken + "]\n");
    }
}