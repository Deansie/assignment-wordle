export function algorithmA() {
    
    // Input
    const guessedWord = "noisy";
    const correctWord = "hoist"

    const guessedUpper = guessedWord.toUpperCase();
    const correctUpper = correctWord.toUpperCase();

    console.log(guessedUpper, correctUpper);

    const guessedArray = guessedUpper.split('');
    const correctArray = correctUpper.split('');
    guessedArray.sort();
    correctArray.sort();

    // Modified input to use in function
    console.log(guessedArray, correctArray);
    
    // Function to check similarity between arrays guessedArray and correctArray
    function compareArrays(array1, array2) {
        if (array1.length !== array2.length) {
            return false;

        } else {
            
            return true;
        }
    } 

    console.log(compareArrays(guessedArray, correctArray));
};

algorithmA();


export function algorithmB() {

};