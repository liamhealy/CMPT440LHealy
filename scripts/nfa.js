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
            id: id,
            accepts: accepts,
            isStartState: isStartState,
            isAcceptState: isAcceptState
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
        // Finally, add the state to the NFA
        this.states.push(state);
    };

    this.delta = function (randomString) {
        // Need to finish analyzeInput() before continuing
        var tempState;
        var tempChar;
        var isAccepted = false;
        var acceptIndex = 0;
        var tokenIndex = 0;
        console.log(this.states);
        for (var i = 0; i < this.states.length; i++) {
            tempState = this.states[i];
            console.log(tempState);
            tempChar = randomString[tokenIndex];
            console.log(tempChar);
            if (tempState.accepts[acceptIndex] == tempChar) {
                if (tempState.isAcceptState == true) {
                    return true;
                }
                else {
                    acceptIndex++;
                    tokenIndex++;
                }
            }
            else {
                // i = 0;
                acceptIndex = 0;
                tokenIndex++;
            }
        }
        return false;
        
        // Outer loop to shift between states
        // for (var i = 0; i < this.states.length; i++) {
        //     tempState = this.states[i];
        //     // Inner loop to shift through and compare acceptable values
        //     for (var j = 0; j < tempState.accepts.length; j++) {
        //         tempChar = randomString[index];
        //         if (tempChar == tempState.accepts[j]) {
        //             if (tempState.isAcceptState == true) {
        //                 isAccepted = true;
        //                 break;
        //             }
        //             else {
        //                 index++;
        //             }
        //         }
        //         else {
        //             index++;
        //             console.log(index);
        //         }
        //     }
        //     if (isAccepted == true) {
        //         return true;
        //     }
        // }
        // return false;
    };

    this.toString = function () {
        var tempState;
        var diagram = "";
        for (var i = 0; i < this.states.length; i++) {
            tempState = this.states[i];
            diagram += "-->" + tempState.id + " [" + tempState.accepts.toString() + ", " + tempState.isStartState + ", " + tempState.isAcceptState + "]";
        }
        return diagram;
    };
}