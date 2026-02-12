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
                     <div className="field label border">
                         <input 
                            type="text" 
                            value={answer || ''} 
                            onChange={(e) => setAnswer(e.target.value)}
                         />
                         <label>{question.placeholder || 'Answer here'}</label>
                     </div>
                );
            case 'color':
                return (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                         <label className="bold">Select a color</label>
                         <div style={{width: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                            <input 
                                type="color" 
                                value={answer || '#000000'}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                            <label className="bold">Pick Color</label>
                         </div>
                        <span className="chip">{answer || '#000000'}</span>
                    </div>
                )
            default:
                return <div>Unknown question type</div>;
        }
    };

    return (
        <article className="center-align">
            <div>
                <div className="row">
                    <div className="max">
                        <h6 className="small-text">Question {currentStep} of {totalSteps}</h6>
                    </div>
                </div>
                
                <h5>{question.text}</h5>
                
                {question.description && <p><i>{question.description}</i></p>}

                <div className="space"></div>
                <div className="left-align">
                    {renderInput()}
                </div>

                <div className="space"></div>

                {error && <div className="banner error">{error}</div>}

                <div className="right-align">
                    <button onClick={handleNext}>
                        {currentStep === totalSteps ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default QuestionScreen;
