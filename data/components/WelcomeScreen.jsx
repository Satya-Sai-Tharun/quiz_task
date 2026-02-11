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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Quiz Application</h1>
            
            {history ? (
                <div>
                    <h2>Welcome back, {history.username}!</h2>
                    {history.completed ? (
                         <button 
                         onClick={onResume}
                         style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                     >
                         View Results
                     </button>
                    ) : (
                        <button 
                            onClick={onResume}
                            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                        >
                            Resume Quiz
                        </button>
                    )}
                     <div style={{marginTop: '20px'}}>
                        <small>Not {history.username}? <a href="#" onClick={() => localStorage.removeItem('quizAppUser') || window.location.reload()}>Restart</a></small>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                            Enter your username to start:
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Username"
                            style={{ padding: '10px', fontSize: '16px', width: '200px' }}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                    >
                        Start
                    </button>
                </form>
            )}
        </div>
    );
};

export default WelcomeScreen;
