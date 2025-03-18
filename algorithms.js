export function algorithmA(guessedWord, correctWord) {
    let guessedUpper = guessedWord.toUpperCase();
    let correctUpper = correctWord.toUpperCase();
    const guessedArray = guessedUpper.split('');
    const correctArray = correctUpper.split('');
    
    function upperCasing() {
        return [guessedUpper, correctUpper];
    }
    
    function stringToArray() {   
        return [guessedArray, correctArray];
    }

    // Output
    function labelLetters(guessedArray, correctArray) {

        return guessedArray.map((letter, index) => {
            if (letter === correctArray[index]) {
                return letter + " / correct";
            } else if (correctArray.includes(letter)) {
                return letter + " / misplaced";
            } else {
                return letter + " / incorrect";
            }
        })
        
    }

    // console.log(labelLetters(guessedArray, correctArray));

    return { upperCasing, stringToArray, labelLetters }
    
}

// algorithmA("Hoist", "Noisy");
