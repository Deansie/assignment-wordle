export function algorithmA(guessedWord, correctWord) {
    
    let guessedUpper = guessedWord.toUpperCase();
    let correctUpper = correctWord.toUpperCase();

    console.log("Guessed word:", guessedUpper, "|| Correct word:", correctUpper);

    const guessedArray = guessedUpper.split('');
    const correctArray = correctUpper.split('');

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

    console.log(labelLetters(guessedArray, correctArray));

    return guessedArray, correctArray;

}

algorithmA("Hoist", "Noisy");