const questions = [
    {
        id: 1,
        type: 'radio',
        text: 'What is the capital of France?',
        options: [
            { id: 'a', text: 'London' },
            { id: 'b', text: 'Berlin' },
            { id: 'c', text: 'Paris' },
            { id: 'd', text: 'Madrid' }
        ],
        correctAnswer: 'c'
    },
    {
        id: 2,
        type: 'checkbox',
        text: 'Which are programming languages?',
        options: [
            { id: 'a', text: 'Python' },        // Correct
            { id: 'b', text: 'HTML' },
            { id: 'c', text: 'CSS' },
            { id: 'd', text: 'JavaScript' },    // Correct
            { id: 'e', text: 'XML' }
        ],
        correctAnswer: ['a', 'd']
    },
    {
        id: 3,
        type: 'toggle',
        text: 'Is the sky blue?',
        options: [
            { id: 'yes', text: 'Yes' },
            { id: 'no', text: 'No' }
        ],
        correctAnswer: 'yes'
    },
    {
        id: 4,
        type: 'text',
        text: 'What is 2 + 2?',
        options: [], // Free text doesn't have fixed options usually, but we could simplify validation.
        correctAnswer: '4',
        placeholder: 'Enter a number...'
    },
    {
        id: 5,
        type: 'color',
        text: 'Pick the color closest to pure Red (#FF0000).',
        options: [], 
        correctAnswer: '#ff0000', // We might do a "close enough" check or exact match
        description: 'Use the color picker.'
    }
];

export default questions;
