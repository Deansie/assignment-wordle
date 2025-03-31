export function algorithmA(guessedWord: string, correctWord: string) {
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
    function labelLetters(guessedArray: string, correctArray: string) {

        return guessedArray.split('').map((letter: string, index: number) => {
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

// algorithmA("Noisy", "Nifty");
