/* nfa.js */

function nfa() {
    /* 
    *  This is the constructor function for an NFA.
    *  The regular expression we take from regex.js
    *  will be used to create an NFA, and the alphabet
    *  we learn from the input file will be used as the alphabet.
    *  ---------------------
    *  An NFA 'n' accepts a string 'x' if there is a
    *  path in the transition map of 'n' from the startState
    *  to an acceptState, such that the labels along this path
    *  form 'x'.
    */


    this.states = null;
    this.alphabet = null;
    this.delta = null;
    this.startState = null;
    this.acceptState = null;
}