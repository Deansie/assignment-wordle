import assert from 'node:assert/strict';
import { algorithmA } from "./algorithms.js";

// Test for uppercasing inputparameters to function algorithmA

const testWords1 = algorithmA('noiSy', 'Noisy')

try {
    assert.deepStrictEqual(testWords1.upperCasing(), ['NOISY', 'NOISY'], 
    'Should return parameters corrected to uppercase lettering'
    );
    console.log('Test for upperCasing passed!')
}

catch (error) {
    console.error('Test failed:', error.message)
}


// Test for converting inputparamters in the form of strings to an array of single letters

const testWords2 = algorithmA('NOISY', 'HOIST')

try {
    assert.deepStrictEqual(testWords2.stringToArray(), [['N', 'O', 'I', 'S', 'Y'], ['H', 'O', 'I', 'S', 'T']], 
    'Should return string parameters split into arrays of individual letters'
    );
    console.log('Test for stringToArray passed!')
}

catch (error) {
    console.error('Test failed:', error.message)
}

// Test for verifying that the output is labeling the letters correctly

    // Test 1 - 'incorrect' on all letters
    const testWords3 = algorithmA('NOISY', 'ABCDE')
    const labelLetters3 = testWords3.labelLetters;

    try {
        const result = labelLetters3(['N', 'O', 'I', 'S', 'Y'], ['A', 'B', 'C', 'D', 'E']);
        assert.deepStrictEqual(
        result, 
        ['N / incorrect', 'O / incorrect', 'I / incorrect', 'S / incorrect', 'Y / incorrect'], 
        'Should return string parameters split into arrays of individual letters'
    );
        console.log('Test for incorrect input on labelLetters passed!')
    }

    catch (error) {
        console.error('Test failed:', error.message)
    }

    // Test 2 - 'correct' on all letters
    const testWords4 = algorithmA('NOISY', 'NOISY')
    const labelLetters4 = testWords4.labelLetters;

    try {
        const result = labelLetters4(['N', 'O', 'I', 'S', 'Y'], ['N', 'O', 'I', 'S', 'Y']);
        assert.deepStrictEqual(
        result, 
        ['N / correct', 'O / correct', 'I / correct', 'S / correct', 'Y / correct'], 
        'Should return array of letters with the text correct after each letter'
    );
        console.log('Test for correct input on labelLetters passed!')
    }

    catch (error) {
        console.error('Test failed:', error.message)
    }

    // Test 3 - 'misplaced' on all letters
    const testWords5 = algorithmA('NOISY', 'SINYO')
    const labelLetters5 = testWords5.labelLetters;

    try {
        const result = labelLetters5(['N', 'O', 'I', 'S', 'Y'], ['S', 'I', 'N', 'Y', 'O']);
        assert.deepStrictEqual(
        result, 
        ['N / misplaced', 'O / misplaced', 'I / misplaced', 'S / misplaced', 'Y / misplaced'], 
        'Should return array of letters with the text misplaced after each letter'
    );
        console.log('Test for misplaced input on labelLetters passed!')
    }

    catch (error) {
        console.error('Test failed:', error.message)
    }

    // Test 4 - Mix of results 'correct' / 'misplaced' / 'incorrect
    const testWords6 = algorithmA('NOISY', 'NIFTY')
    const labelLetters6 = testWords6.labelLetters;

    try {
        const result = labelLetters6(['N', 'O', 'I', 'S', 'Y'], ['N', 'I', 'F', 'T', 'Y']);
        assert.deepStrictEqual(
        result, 
        ['N / correct', 'O / incorrect', 'I / misplaced', 'S / incorrect', 'Y / correct'], 
        'Should return array of letters with the text correct/misplaced/incorrect in a mixed manor once after each letter'
    );
        console.log('Test for mixed result from input on labelLetters passed!')
    }

    catch (error) {
        console.error('Test failed:', error.message)
    }

