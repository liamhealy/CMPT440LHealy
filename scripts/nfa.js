/* nfa.js */

function Nfa() {
    /* 
    *  This is the constructor function for an NFA, which
    *  forms a 5-tuple. The regular expression we take from regex.js
    *  will be used to create an NFA, and the alphabet
    *  we learn from the input file will be used as the alphabet.
    *  ---------------------
    *  An NFA 'n' accepts a string 'x' if there is a
    *  path in the transition map of 'n' from the startState
    *  to an acceptState, such that the labels along this path
    *  form 'x'.
    */


    this.states = [];
    this.currentState = {};
    this.alphabet = null;
    this.delta = null;
    this.startState = null;
    this.acceptState = null;

    // Add a state
    this.addState = function (id, accepts, isStartState, isAcceptState) {
        // The state object
        var state = {
            id: null,
            accepts: [],
            isStartState: false,
            isAcceptState: false
        };
    
        // Set it to be the start state if needed
        if (this.startState == null) {
            this.startState = state;
            this.cur = state;
            state.isStartState = true;
        }
        else {
            this.cur = state;
        }
    }

    this.delta = function() {
        // Need to finish analyzeInput() before continuing
    }
}