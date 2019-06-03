/* token.js 
*  this file contains a constructor function
*  for a token
*/

// global token sequence variable (resets with each call to grabInput())
var tokenSequence = [];

// This function allows us to create usable tokens
function token (value) {
    this.value = value;
}

// We can add our token to the toke sequence
function addToken (value) {
    // Create a token to enter into the token sequence
    var newToken = new token(value);
    // Add our new token
    tokenSequence.push(newToken);
}