import React, { useState, useEffect } from 'react';
import questions from './questions';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [username, setUsername] = useState('');
  const [currentStep, setCurrentStep] = useState(0); // 0: Welcome, 1-5: Questions, 6: Results
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState(null); // Loaded from localStorage

  useEffect(() => {
    const savedData = localStorage.getItem('quizAppUser');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUsername(parsed.username);
      setHistory(parsed);
    }
  }, []);

  const handleStart = (name) => {
    setUsername(name);
    setCurrentStep(1);
    localStorage.setItem('quizAppUser', JSON.stringify({ username: name, completed: false, answers: {} }));
  };

  const handleResume = () => {
      // Resume logic will be refined
      if (history && history.completed) {
          setCurrentStep(6);
      } else if (history && history.answers) {
          // If in progress, find first unanswered question? Or just resume last saved step?
          // For simplicity and robustness, let's resume based on answer count.
          const answeredCount = Object.keys(history.answers).length;
          setCurrentStep(answeredCount + 1);
          setAnswers(history.answers);
      } else {
          setCurrentStep(1);
      }
  }

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    const nextStep = currentStep + 1;
    
    // Save progress
    const userData = {
        username,
        completed: nextStep > questions.length,
        answers: newAnswers
    };
    localStorage.setItem('quizAppUser', JSON.stringify(userData));

    setCurrentStep(nextStep);
  };

  const handleRestart = () => {
      localStorage.removeItem('quizAppUser');
      setUsername('');
      setAnswers({});
      setCurrentStep(0);
      setHistory(null);
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      {currentStep === 0 && (
        <WelcomeScreen 
            onStart={handleStart} 
            history={history} 
            onResume={handleResume}
        />
      )}
      {currentStep > 0 && currentStep <= questions.length && (
        <QuestionScreen 
            question={questions[currentStep - 1]} 
            onAnswer={handleAnswer} 
            currentStep={currentStep}
            totalSteps={questions.length}
        />
      )}
      {currentStep > questions.length && (
        <ResultScreen 
            username={username}
            answers={answers} 
            questions={questions}
            onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
