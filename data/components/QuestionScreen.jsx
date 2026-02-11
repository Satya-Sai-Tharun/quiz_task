import React, { useState } from 'react';
import RadioGroup from './controls/RadioGroup';
import CheckboxGroup from './controls/CheckboxGroup';
import Toggle from './controls/Toggle';

const QuestionScreen = ({ question, onAnswer, currentStep, totalSteps }) => {
    const [answer, setAnswer] = useState(null);
    const [error, setError] = useState('');

    // Reset local state when question changes
    React.useEffect(() => {
        setAnswer(null);
        setError('');
    }, [question.id]);

    const handleNext = () => {
        // Validation logic
        if (!answer) {
            setError('Please provide an answer to proceed.');
            return;
        }

        if (question.type === 'checkbox') {
            // Specific validation for Q2: "check to see if 2 options are selected"
            if (!Array.isArray(answer) || answer.length !== 2) {
                setError('Please select exactly 2 options.');
                return;
            }
        }
        
        onAnswer(question.id, answer);
    };

    const renderInput = () => {
        switch (question.type) {
            case 'radio':
                return <RadioGroup options={question.options} value={answer} onChange={setAnswer} />;
            case 'checkbox':
                return <CheckboxGroup options={question.options} value={answer || []} onChange={setAnswer} />;
            case 'toggle':
                return <Toggle options={question.options} value={answer} onChange={setAnswer} />;
            case 'text':
                // Creative Q4
                return (
                     <input 
                        type="text" 
                        value={answer || ''} 
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder={question.placeholder}
                        style={{ padding: '10px', width: '100%', maxWidth: '300px' }}
                     />
                );
            case 'color':
                // Creative Q5
                return (
                    <div>
                        <input 
                            type="color" 
                            value={answer || '#000000'}
                            onChange={(e) => setAnswer(e.target.value)}
                            style={{ height: '50px', width: '100px', cursor: 'pointer' }}
                        />
                        <p>{answer || 'Select a color'}</p>
                    </div>
                )
            default:
                return <div>Unknown question type</div>;
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <div style={{ marginBottom: '10px', color: '#666' }}>
                Question {currentStep} of {totalSteps}
            </div>
            
            <h2 style={{ marginBottom: '20px' }}>{question.text}</h2>
            
            {question.description && <p style={{fontStyle: 'italic', marginBottom: '1rem'}}>{question.description}</p>}

            <div style={{ marginBottom: '30px' }}>
                {renderInput()}
            </div>

            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

            <button 
                onClick={handleNext}
                style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {currentStep === totalSteps ? 'Finish' : 'Next'}
            </button>
        </div>
    );
};

export default QuestionScreen;
