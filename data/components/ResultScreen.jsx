import React, { useMemo } from 'react';

const ResultScreen = ({ username, answers, questions, onRestart }) => {
    const results = useMemo(() => {
        let correct = 0;
        let wrong = 0;
        const wrongList = [];

        const formatAnswer = (q, ans) => {
            if (ans == null) return '';
            if (Array.isArray(ans)) {
                return ans.map(a => (q.options.find(o => o.id === a) || { text: a }).text).join(', ');
            }
            // single value - try to map to option text
            const opt = q.options.find(o => o.id === ans);
            if (opt) return opt.text;
            return String(ans);
        };

        questions.forEach(q => {
            const userAnswer = answers[q.id];
            let isCorrect = false;

            if (Array.isArray(q.correctAnswer)) {
                if (Array.isArray(userAnswer) && 
                    userAnswer.length === q.correctAnswer.length && 
                    userAnswer.every(val => q.correctAnswer.includes(val))) {
                    isCorrect = true;
                }
            } else if (q.type === 'color') {
                if (userAnswer && typeof userAnswer === 'string' && q.correctAnswer && userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()) {
                    isCorrect = true;
                }
            } else {
                if (userAnswer === q.correctAnswer) {
                    isCorrect = true;
                }
            }

            if (isCorrect) correct++;
            else {
                wrong++;
                wrongList.push({
                    id: q.id,
                    text: q.text,
                    user: formatAnswer(q, userAnswer),
                    correct: Array.isArray(q.correctAnswer) ? q.correctAnswer.map(a => (q.options.find(o => o.id === a) || { text: a }).text).join(', ') : (q.options.find(o => o.id === q.correctAnswer)?.text || q.correctAnswer)
                });
            }
        });

        const percentage = Math.round((correct / questions.length) * 100);
        return { correct, wrong, percentage, wrongList };
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
{/* 
            {results.wrongList && results.wrongList.length > 0 && (
                <div style={{ maxWidth: '700px', margin: '20px auto', textAlign: 'left' }}>
                    <h3>Review Wrong Answers</h3>
                    <ul>
                        {results.wrongList.map(w => (
                            <li key={w.id} style={{ marginBottom: '12px' }}>
                                <div style={{ fontWeight: 'bold' }}>{w.text}</div>
                                <div>Your answer: <span style={{ color: '#d9534f' }}>{w.user || '(no answer)'}</span></div>
                                <div>Correct answer: <span style={{ color: 'green' }}>{w.correct}</span></div>
                            </li>
                        ))}
                    </ul>
                </div>
            )} */}

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
