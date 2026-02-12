import React, { useState, useEffect } from 'react';
import { loadQuestionsFromCSV } from './questions';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [username, setUsername] = useState('');
  const [currentStep, setCurrentStep] = useState(0); // 0: Welcome, 1-5: Questions, 6: Results
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState(null); // Loaded from localStorage
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('quizAppUser');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUsername(parsed.username);
      setHistory(parsed);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    loadQuestionsFromCSV()
      .then((rows) => {
        if (!mounted) return;
        setQuestions(rows);
      })
      .catch((err) => {
        if (!mounted) return;
        setLoadError(err.message || String(err));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false; };
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
          setAnswers(history.answers); // Restore answers for result screen
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
        completed: questions ? nextStep > questions.length : false,
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

  if (loading) {
    return <div className="loader center-align"></div>;
  }

  if (loadError) {
    return <div className="banner error">{loadError}</div>;
  }

  return (
    <>
      <div className="background-overlay"></div>
      <main className="responsive">
      {currentStep === 0 && (
        <WelcomeScreen 
            onStart={handleStart} 
            history={history} 
            onResume={handleResume}
        />
      )}
      {questions && currentStep > 0 && currentStep <= questions.length && (
        <QuestionScreen 
            question={questions[currentStep - 1]} 
            onAnswer={handleAnswer} 
            currentStep={currentStep}
            totalSteps={questions.length}
        />
      )}
      {questions && currentStep > questions.length && (
        <ResultScreen 
            username={username}
            answers={answers} 
            questions={questions}
            onRestart={handleRestart}
        />
      )}
      </main>
    </>
  );
}

export default App;
