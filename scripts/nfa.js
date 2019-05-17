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
    // this.currentState = {};
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

        var tempState = 0;
        var stateLength = 0;
        var tempChar = randomString;
        var isAccepted = false;
        var acceptIndex = 0;
        var tokenIndex = 0;
        console.log(this.states);
        console.log(randomString.length);


        for (var i = 0; i < randomString.length; i++) {
            console.log(this.states[acceptIndex].accepts.length);
            console.log(randomString[tokenIndex]);
            stateLength = this.states[acceptIndex].accepts.length;
            if (randomString[tokenIndex] == this.states[tempState].accepts[acceptIndex]) {
                if (this.states[tempState].isAcceptState == true) {
                    return true;
                }
                else {
                    tempState++;
                    tokenIndex++;
                    acceptIndex = 0;
                    continue;
                }
            }
            // else if (stateLength == 0) {
            //     if (this.states[tempState].isAcceptState == true) {
            //         return true;
            //     }
            //     else {
            //         tempState++;
            //         acceptIndex = 0;
            //         continue;
            //     }
            // }
            else {
                // tokenIndex++;
                return false;
            }
        }
        return false;
    };

    this.transition = function (token) {

        // var tokenIndex = 0;

        // function delta () {
            var currentState = 0;
            var tempState = this.states[currentState];
            var tempChar = token[0];

            for (var i = 0; i < token.length; i++) {
                if (token[i] == tempState.accepts[i]) {
                    currentState++;
                    if (tempState.isAcceptState == true && i == token.length) {
                        return true;
                    }
                }
                else {
                    currentState = 0;
                }
            }
            console.log(tempState.accepts[i]);
            console.log(tempChar);
            return false;
        // }

        // delta(token);
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