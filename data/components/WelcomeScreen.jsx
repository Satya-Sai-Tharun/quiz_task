import React, { useState } from 'react';

const WelcomeScreen = ({ onStart, history, onResume }) => {
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
                             <button onClick={onResume}>
                                 View Results
                             </button>
                        ) : (
                            <button onClick={onResume}>
                                Resume Quiz
                            </button>
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
                        <button type="submit" className="responsive">
                            Start
                        </button>
                    </form>
                )}
            </div>
        </article>
    );
};

export default WelcomeScreen;