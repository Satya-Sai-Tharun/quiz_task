import React, { useMemo } from 'react';

const ResultScreen = ({ username, answers, questions, onRestart }) => {
    const results = useMemo(() => {
        let correct = 0;
        let wrong = 0;
        
        questions.forEach(q => {
            const userAnswer = answers[q.id];
            
            let isCorrect = false;
            if (Array.isArray(q.correctAnswer)) {
                // For checkboxes/arrays, we need to check if arrays match content-wise
                if (Array.isArray(userAnswer) && 
                    userAnswer.length === q.correctAnswer.length && 
                    userAnswer.every(val => q.correctAnswer.includes(val))) {
                    isCorrect = true;
                }
            } else if (q.id === 5) {
                // Color hex check - case insensitive
                if (userAnswer && userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()) {
                    isCorrect = true;
                }
            } else {
                if (userAnswer === q.correctAnswer) {
                    isCorrect = true;
                }
            }

            if (isCorrect) correct++;
            else wrong++;
        });

        const percentage = Math.round((correct / questions.length) * 100);
        return { correct, wrong, percentage };
    }, [answers, questions]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Quiz Results</h1>
            <p style={{ fontSize: '18px' }}>
                Thank you for completing the quiz, <strong>{username}</strong>!
            </p>

            <div style={{ 
                margin: '30px auto', 
                padding: '20px', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                maxWidth: '400px',
                backgroundColor: '#f9f9f9'
            }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: results.percentage >= 50 ? 'green' : 'orange' }}>
                    {results.percentage}%
                </div>
                <p>Score</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    <div>
                        <div style={{ fontSize: '24px', color: 'green' }}>{results.correct}</div>
                        <div>Correct</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', color: 'red' }}>{results.wrong}</div>
                        <div>Wrong</div>
                    </div>
                </div>
            </div>

            <button 
                onClick={onRestart}
                style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
            >
                Start New Quiz
            </button>
        </div>
    );
};

export default ResultScreen;
