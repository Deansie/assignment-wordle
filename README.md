# Assignment: Wordle

Assignment: Create a game inspired by the popular game Wordle

---

## First Submission

Create an algorithm to be used for the central parts of the game according to the following instructions:

This function defines the rules for the feedback the game provides when the player guesses a word. It must meet the following criteria:

- **Inputs**: Two words (two text strings)
  - One word that is the guess
  - One word that is the correct word

- **Functionality**: Check which letters from one word appear in the other and, if so, where

- **Output**: An array of objects, one for each letter in the same order as they appear in the guessed word, with the following attributes:
  - `letter` (the letter)
  - `result` (one of the following values)
    - `'incorrect'`: Not present in the other word
    - `'misplaced'`: Present in the other word, but in a different position
    - `'correct'`: Correct position in the other word

### Example

The words "CYKLA" (selected) and "HALLÅ" (guess) would return the following:

- H / `incorrect`
- A / `misplaced`
- L / `incorrect` (since there is already a correct L)
- L / `correct`
- Å / `incorrect`