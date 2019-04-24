/* grepy.js */

function grabInput() {
    // Grab the "raw" source code.
    var call = document.getElementById("call").value;
    // Trim the leading and trailing spaces.
    call = trim(call);
    // TODO: remove all spaces in the middle; remove line breaks too.
    return call;
    // document.getElementById("shell").value = call;
}

function analyzeCall() {
    // Sort of a lexical analysis of the actual call itself
    var newCall = grabInput();

    grepyOutput("hi im liam");
    // document.getElementById("shell").value = newCall;
}