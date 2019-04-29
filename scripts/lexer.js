/* lexer.js */

// A few global variables
var regex = "";

var newPattern = null;

function grabInput() {
    // Grab the "raw" source code.
    var call = document.getElementById("manualData").value;
    // Trim the leading and trailing spaces.
    call = trim(call);
    // TODO: remove all spaces in the middle; remove line breaks too.
    
    regex = document.getElementById("regex").value;
    newPattern = new RegExp(regex);

    return call;
    // document.getElementById("shell").value = call;
}

function analyzeCall() {
    // Sort of a lexical analysis of the actual call itself

    // Clean up the shell before we analyze each call
    // and return more output
    document.getElementById("shell").value = "";

    // Keep track of the token we're analyzing
    var currentToken = 0;

    // Grab the new call
    var newCall = grabInput();

    var result = newPattern.test(newCall);

    grepyOutput(result);
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