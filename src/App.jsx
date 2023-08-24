import { React, useEffect, useState } from 'react'
import './App.css'
import Questions from './components/Questions'
import he from 'he';

function App() {

  const [start, setStart] = useState(true)
  const [questions,setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  
  const updateScore = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
      const data = await res.json()
      setQuestions(data.results.map(questionsData => {
        const options = [...questionsData.incorrect_answers, questionsData.correct_answer]
        const question = he.decode(questionsData.question);
        return {
          question: question,
          options: options,
          correctOption: questionsData.correct_answer,
        }
      }))
    }
    getQuestions()
  },[start])

  const questionComponents = questions.map((questionData, index) => (
    <Questions 
    key={index}
    question={questionData.question}
    options={questionData.options}
    correctOption={questionData.correctOption}
    score={score}
    updateScore={updateScore} />
  ));

  function checkAnswers() {
    setShowScore(true)
  }
  
  return (
    <main>
      { start ?
        <div className='start-container'>
          <h1 className='start-header'>Quizzical</h1>
          <p className='start-desc'>Answer the Trivia and Test Your Knowledge!</p>
          <button className='start-btn' onClick={() => setStart(false)}>Start Quiz</button>
        </div> :
        <div>
          {questionComponents}
          <div className='score-container'>
            {showScore && <h1 className='score-statement'>You scored {score}/10 correct answers</h1>}
            <button className="questions-btn" onClick={checkAnswers}>Check Answers</button>
          </div>
        </div>
      }
    </main>
  )
}

export default App
