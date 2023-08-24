import { React, useEffect, useState } from 'react'
import './App.css'
import Questions from './components/Questions'

function App() {

  const [start, setStart] = useState(true)
  const [questions,setQuestions] = useState([])

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
      const data = await res.json()
      setQuestions(data.results.map(questionsData => {
        const options = [...questionsData.incorrect_answers, questionsData.correct_answer]
        return {
          question: questionsData.question,
          options: options,
          correctOption: questionsData.correct_answer
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
    correctOption={questionData.correctOption} />
  ));

  
  return (
    <main>
      { start ?
        <div className='start-container'>
          <h1 className='start-header'>Quizzical</h1>
          <p className='start-desc'>some description if needed</p>
          <button className='start-btn' onClick={() => setStart(false)}>Start Quiz</button>
        </div> :
        <div>
          {questionComponents}
          <button className="questions-btn">Check Answers</button>
        </div>
      }
    </main>
  )
}

export default App
