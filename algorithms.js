export function algorithmA() {
    
    const guessedWord = "noisy";
    const correctWord = "hoist"

    const guessedUpper = guessedWord.toUpperCase();
    const correctUpper = correctWord.toUpperCase();

    console.log(guessedUpper, correctUpper);

    const guessedArray = guessedUpper.split('');
    const correctArray = correctUpper.split('');
    guessedArray.sort();
    correctArray.sort();

    console.log(guessedArray, correctArray);
};

algorithmA();

export function algorithmB() {

};