/* lexer.js */

// A few global variables
var regex = "";

var newPattern = null;

var input = null;

var regexNfa = new Nfa();

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

    // Test input using the javascript Regex library
    // (this is only here temporarily)
    var testInput = false;
    var testData = null;
    // for (var i = 0; i < tokenSequence.length; i++) {
    //     testData = tokenSequence[i]
    //     testInput = newPattern.test(testData.value);
    //     grepyOutput(testInput);
    //     if (testInput == true) {
    //         grepyOutput(testData.value);
    //     }
    // }

    // Create the NFA (show it temporarily)
    createNfa(regex, regexNfa);
    grepyOutput(regexNfa.toString());

    // Test the input on the NFA
    for (var i = 0; i < tokenSequence.length; i++) {
        testData = tokenSequence[i];
        console.log(testData.value);
        testInput = newPattern.test(testData.value);
        grepyOutput("Line " + i + "\n" + testInput);
        if (testInput == true) {
            grepyOutput(testData.value);
        }
        
        testInput = regexNfa.delta(testData.value);
        grepyOutput(testInput);
        grepyOutput(">");
    }

    // Using the same constructor we did for NFA's,
    // because every NFA can be translated to an 
    // equivalent DFA using subset contruction
    var regexDfa = subsetConstruction(regexNfa);
    console.log(regexDfa);


    // Reset values that will be reused
    resetGlobals();
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
            console.log(temp.length);
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

function createNfa(tempRegex, tempNfa) {
    // We need to create an NFA and possibly
    // even concatenate two of them using the
    // epsilon production
    var stateId = 0;
    var col = 0;

    for (var index = 0; index < tempRegex.length; index++) {
        if (tempRegex[index] == "{") {
            if (tempRegex[index + 1] == "}" && tempRegex[index + 2] == "*") {
                tempNfa.addState("q" + stateId, [], false, false);
                stateId++;
                if (index + 1 == tempRegex.length - 1) {
                    tempNfa.addState("q" + stateId, [/^\s*$/g], false, true);
                }
                else {
                    tempNfa.addState("q" + stateId, [/^\s*$/g], false, false);
                }
                col = col + 3;
                stateId++;
            }
            index = col;
            continue;
        }
        else if ('abcdefghijklmnopqrstuvwxyz'.includes(tempRegex[index])) {
            if (tempRegex[index + 1] == "*") {
                // We'll need to work on this in a bit
            }
            else if (tempRegex[index + 1] == "|" || tempRegex[index + 1] == "+") {
                // We'll need to work on this in a bit
            }
            else if ('abcdefghijklmnopqrstuvwxyz'.includes(tempRegex[index + 1])) {
                tempNfa.addState("q" + stateId, [], false, false);
                stateId++;
                tempNfa.addState("q" + stateId, [tempRegex[index]], false, false); 
                stateId++;
                if (index + 2 == tempRegex.length) {
                    tempNfa.addState("q" + stateId, [tempRegex[index + 1]], false, true);
                }
                else {
                    tempNfa.addState("q" + stateId, [tempRegex[index + 1]], false, false);
                }
                col = col + 2;
                stateId++;
            }
            else {
                tempNfa.addState("q" + stateId, [], false, false);
                stateId++;
                if (index + 1 == tempRegex.length) {
                    tempNfa.addState("q" + stateId, [tempRegex[index]], false, true);
                }
                else {
                    tempNfa.addState("q" + stateId, [tempRegex[index]], false, false);
                }
                col++;
                stateId++;
            }
            index = col;
            continue;
        }
        else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(tempRegex[index])) {
            if (tempRegex[index + 1] == "*") {
                // We'll need to work on this in a bit
            }
            else if (tempRegex[index + 1] == "|" || tempRegex[index + 1] == "+") {
                // We'll need to work on this in a bit
            }
            else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(tempRegex[index + 1])) {
                tempNfa.addState("q" + stateId, [], false, false);
                stateId++;
                tempNfa.addState("q" + stateId, [tempRegex[index]], false, false); 
                stateId++;
                if (index + 2 == tempRegex.length) {
                    tempNfa.addState("q" + stateId, [tempRegex[index + 1]], false, true);
                }
                else {
                    tempNfa.addState("q" + stateId, [tempRegex[index + 1]], false, false);
                }                 
                col = col + 2;
                stateId++;
            }
            else {
                tempNfa.addState("q" + stateId, [], false, false);
                stateId++;
                if (index + 1 == tempRegex.length) {
                    tempNfa.addState("q" + stateId, [tempRegex[index]], false, true);
                }
                else {
                    tempNfa.addState("q" + stateId, [tempRegex[index]], false, false);
                }
                col++;
                stateId++;
            }
            index = col;
            continue;
        }
        else if ('0123456789'.includes(tempRegex[index])) {
            if (tempRegex[index + 1] == "*") {
                // We'll need to work on this in a bit
            }
            else if (tempRegex[index + 1] == "|" || tempRegex[index + 1] == "+") {
                // We'll need to work on this in a bit
            }
            else if ('0123456789'.includes(tempRegex[index + 1])) {
                tempNfa.addState("q" + stateId, [], false, false);
                stateId++;
                tempNfa.addState("q" + stateId, [tempRegex[index]], false, false); 
                stateId++;
                if (index + 2 == tempRegex.length) {
                    tempNfa.addState("q" + stateId, [tempRegex[index + 1]], false, true);
                }
                else {
                    tempNfa.addState("q" + stateId, [tempRegex[index + 1]], false, false);
                }                 
                col = col + 2;
                stateId++;
            }
            else {
                tempNfa.addState("q" + stateId, [], false, false);
                stateId++;
                if (index + 1 == tempRegex.length) {
                    tempNfa.addState("q" + stateId, [tempRegex[index]], false, true);
                }
                else {
                    tempNfa.addState("q" + stateId, [tempRegex[index]], false, false);
                }
                col++;
                stateId++;
            }
            index = col;
            continue;
        }
    }
}
        

// Convert the NFA to a DFA
// We may need to combine several states,
// so I need to figure out how to do that
function subsetConstruction(tempNfa) {
    
    var newDfa = new Nfa();
    var stateCounter = 0;

    for (var i = 0; i < tempNfa.states.length; i++) {
        for (var j = 0; j < tempNfa.states[i].accepts.length; j++) {
            if (stateCounter == 0) {
                newDfa.addState("q" + stateCounter, [tempNfa.states[i].accepts[j]], true, false);                    
            }
            else {
                newDfa.addState("q" + stateCounter, [tempNfa.states[i].accepts[j]], false, false);                    
            }
        }
    }
    return newDfa;
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
}

function resetGlobals() {
    regex = "";

    newPattern = null;

    input = null;

    regexNfa = new Nfa();

    tokenSequence = [];
}