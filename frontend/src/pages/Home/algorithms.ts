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
     
        const letterCounts: { [key: string]: number } = {};
        for (const letter of correctArray) {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        }

        const labels: string[] = new Array(guessedArray.length).fill('');
        for (let i = 0; i < guessedArray.length; i++) {
            const letter = guessedArray[i];
            if (letter === correctArray[i]) {
                labels[i] = letter + " / correct";
                letterCounts[letter]--;
            }
        }

        for (let i = 0; i < guessedArray.length; i++) {
            if (labels[i]) continue; 
            const letter = guessedArray[i];
            
            if (letterCounts[letter] > 0) {
                labels[i] = letter + " / misplaced";
                letterCounts[letter]--;
            } else {
                labels[i] = letter + " / incorrect";
            }
        }

        return labels;
    }

    return { upperCasing, stringToArray, labelLetters }
    
}
