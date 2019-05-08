/* lexer.js */

// A few global variables
var regex = "";

var newPattern = null;

var input = null;

function grabInput() {
    // Grab the "raw" source code.
    var newData = document.getElementById("manualData").value;
    // Trim the leading and trailing spaces.
    newData = trim(newData);
    // TODO: remove all spaces in the middle; remove line breaks too.
    return newData;
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
        // storeRegex(regex);
        /*
        *   TODO: Create an NFA based on the regular expression
        */
        // Begin lexical analysis on the input
        lexInput();
    }
    catch (err) {
        grepyOutput("Invalid regular expression entered.");
    }

    var testInput = false;
    var testData = null;
    for (var i = 0; i < tokenSequence.length; i++) {
        testData = tokenSequence[i]
        testInput = newPattern.test(testData.value);
        grepyOutput(testInput);
        if (testInput == true) {
            grepyOutput(testData.value);
        }
    }

}

function lexInput() {
    // Grab the input data
    input = grabInput();

    // Set a line number variable
    var lineNum = 0;

    var temp = "";

    // Store the input line-by-line since that
    // is how we wanna analyze it
    for (var i = 0; i <= input.length; i++) {
        if (input[i] == "\n") {
            addToken(temp);
            lineNum++;
            temp = "";
        }
        else if (i == input.length - 1) {
            temp += input[i];
            addToken(temp);
        }
        else {
            temp += input[i];
        }
    }
    console.log(input);
    console.log(tokenSequence);
    console.log(lineNum);
    /*
    *   TODO: Test the input data against the DFA
    *         which will be created based on the NFA.
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
    // Initialize a new NFA for this regex
    var regexN = new Nfa();
}