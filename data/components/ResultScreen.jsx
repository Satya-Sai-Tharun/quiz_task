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
        <article className="center-align">
            <div>
                <h4>Quiz Results</h4>
                <p>
                    Thank you for completing the quiz, <strong>{username}</strong>!
                </p>
                <div className="space"></div>

                <div className="padding surface-container primary-border round small-width center-align" style={{ margin: '0 auto' }}>
                    <h1 className={results.percentage >= 50 ? 'green-text' : 'orange-text'}>
                        {results.percentage}%
                    </h1>
                    <p>Score</p>
                    
                    <div className="grid">
                        <div className="s6">
                            <h4 className="green-text">{results.correct}</h4>
                            <div>Correct</div>
                        </div>
                        <div className="s6">
                            <h4 className="red-text">{results.wrong}</h4>
                            <div>Wrong</div>
                        </div>
                    </div>
                </div>

                <div className="space"></div>
                
                <button 
                    onClick={onRestart}
                    className="secondary"
                >
                    Start New Quiz
                </button>
            </div>
        </article>
    );
};

export default ResultScreen;
