export function algorithmA(guessedWord, correctWord) {
    const guessedUpper = guessedWord.toUpperCase();
    const correctUpper = correctWord.toUpperCase();
    const guessedArray = guessedUpper.split('');
    const correctArray = correctUpper.split('');

    function upperCasing() {
        return [guessedUpper, correctUpper];
    }

    function stringToArray() {
        return [guessedArray, correctArray];
    }

    function labelLetters(guessedArray, correctArray) {
        const letterCounts = {};
        for (const letter of correctArray) {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        }

        const labels = new Array(guessedArray.length).fill('');
        for (let i = 0; i < guessedArray.length; i++) {
            const letter = guessedArray[i];
            if (letter === correctArray[i]) {
                labels[i] = `${letter} / correct`;
                letterCounts[letter]--;
            }
        }

        for (let i = 0; i < guessedArray.length; i++) {
            if (labels[i]) continue;
            const letter = guessedArray[i];

            if (letterCounts[letter] > 0) {
                labels[i] = `${letter} / misplaced`;
                letterCounts[letter]--;
            } else {
                labels[i] = `${letter} / incorrect`;
            }
        }

        return labels;
    }

    return { upperCasing, stringToArray, labelLetters };
}