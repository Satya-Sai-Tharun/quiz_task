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
    
    // First, try to load from localStorage to support reload/resume in offline mode
    const savedQuestions = localStorage.getItem('quizAppQuestions');
    if (savedQuestions) {
        try {
            const parsedQuestions = JSON.parse(savedQuestions);
            if (parsedQuestions && parsedQuestions.length > 0) {
                setQuestions(parsedQuestions);
                setLoading(false);
                return; // questions loaded from storage, skip fetch
            }
        } catch (e) {
            console.error("Failed to parse saved questions", e);
            localStorage.removeItem('quizAppQuestions');
        }
    }

    // specific fall-back if not found in storage
    loadQuestionsFromCSV()
      .then((rows) => {
        if (!mounted) return;
        if (rows && rows.length > 0) {
            setQuestions(rows);
            // Save to localStorage so they persist on reload
            localStorage.setItem('quizAppQuestions', JSON.stringify(rows));
            setLoading(false);
        } else {
            // If no default questions (e.g. file:// protocol block), stop loading so user can upload
            setLoading(false); 
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.warn("Auto-load failed, waiting for user input.", err);
        setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const handleFileSelect = (file) => {
      setLoading(true);
      setLoadError(null);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
          const text = e.target.result;
          try {
              const rows = await loadQuestionsFromCSV(text);
              if (rows && rows.length > 0) {
                  setQuestions(rows);
                  localStorage.setItem('quizAppQuestions', JSON.stringify(rows));
              } else {
                  setLoadError("No questions found in file.");
              }
          } catch (err) {
              setLoadError("Failed to parse CSV: " + err.message);
          } finally {
              setLoading(false);
          }
      };
      reader.onerror = () => {
          setLoadError("Failed to read file.");
          setLoading(false);
      }
      reader.readAsText(file);
  };

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
      localStorage.removeItem('quizAppQuestions');
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
            onFileSelect={handleFileSelect}
            hasQuestions={!!questions && questions.length > 0}
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
