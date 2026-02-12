import React, { useState } from 'react';

const WelcomeScreen = ({ onStart, history, onResume, onFileSelect, hasQuestions }) => {
    const [name, setName] = useState(history?.username || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onStart(name);
        }
    };

    return (
        <article className="center-align">
            <div>
                <h5>Quiz Application</h5>
                
                {history ? (
                    <div>
                        <p>Welcome back, <strong>{history.username}</strong>!</p>
                        <div className="space"></div>
                        {history.completed ? (
                             <button onClick={onResume} disabled={!hasQuestions}>
                                 View Results
                             </button>
                        ) : (
                            <button onClick={onResume} disabled={!hasQuestions}>
                                Resume Quiz
                            </button>
                        )}
                        {!hasQuestions && (
                            <p className="error-text" style={{ marginTop: '10px' }}>
                                <small>Questions missing. Please import to resume.</small>
                            </p>
                        )}
                        <div className="space"></div>
                        <p>
                            <small>Not {history.username}? <a href="#" onClick={() => localStorage.removeItem('quizAppUser') || window.location.reload()}>Restart</a></small>
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="field label border">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label>Username</label>
                        </div>
                        <div className="space"></div>
                        <button type="submit" className="responsive" disabled={!hasQuestions}>
                            Start
                        </button>
                    </form>
                )}

                <div className="space"></div>
                
                <div className="center-align">
                    <p><small>--- OR ---</small></p>
                    <label className="button flat">
                        Import Questions (CSV)
                        <input type="file" accept=".csv" onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                onFileSelect(e.target.files[0]);
                            }
                        }} style={{ display: 'none' }} />
                    </label>
                    {!hasQuestions && <p className="error-text"><small>Please import questions to start.</small></p>}
                </div>
            </div>
        </article>
    );
};

export default WelcomeScreen;