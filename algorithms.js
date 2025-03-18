export function algorithmA() {
    
    // Input
    const guessedWord = "haass";
    const correctWord = "hoist"

    const guessedUpper = guessedWord.toUpperCase();
    const correctUpper = correctWord.toUpperCase();

    console.log(guessedUpper, correctUpper);

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
    console.log(compareArrays(guessedArray, correctArray));
}
