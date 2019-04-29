/* token.js 
*  this file contains a constructor function
*  for a token
*/

// global token sequence variable (resets with each call to grabInput())
var tokenSequence = [];

// This function allows us to create usable tokens
function token (type, value) {
    this.type = type;
    this.value = value;
}

// We can add our token to the toke sequence
function addToken (tokenId, value) {
    // Create a token to enter into the token sequence
    var newToken = new token(tokenId, value);
    // Add our new token
    tokenSequence.push(newToken);
}