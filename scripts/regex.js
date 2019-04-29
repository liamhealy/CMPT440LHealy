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
    try {
        newPattern = new RegExp(regex);
        console.log(newPattern);
        storeRegex(regex);
    }
    catch (err) {
        grepyOutput("Invalid regular expression entered.");
    }
    // Keep track of the token we're analyzing

    // Grab the new call
    input = grabInput();

    // for (index; index < regex.length; index++) {

    //     var currentToken = regex[index];

    //     if (currentToken == "") {
    //         // add this token to the sequence
    //         grepyOutput("Found a " + currentToken);
    //     }
    //     // if (index >= 1) {
    //     //     currentToken = getNextToken(currentToken);
    //     // }
    
    // }
    // if (newCall == regex) {
    //     grepyOutput(true);
    // }
    // else {
    //     grepyOutput(false);
    // }

    // Check to see if the call includes 'grepy.Grep'
    // var syntaxCheck = null;
    // for (currentToken; currentToken <= grepySyntax.length; currentToken++) {
    //     syntaxCheck += newCall.charAt(currentToken);
    // }    

    // if (syntaxCheck != "grepy.Grep") {
    //     grepyOutput("We have an issue...");
    // }
    // document.getElementById("shell").value = newCall;
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