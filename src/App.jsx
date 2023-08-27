import { React, useEffect, useState } from 'react'
import './App.css'
import Questions from './components/Questions'
import he from 'he';
import Confetti from 'react-confetti';

function App() {

  const [start, setStart] = useState(true)
  const [questions,setQuestions] = useState([])
  const [answersSubmitted, setAnswersSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  
  const updateScore = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => isCorrect ? score + 1 : prevScore);
    }
  };

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple")
      const data = await res.json()
      setQuestions(data.results.map(questionsData => {
        const options = [...questionsData.incorrect_answers, questionsData.correct_answer]
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
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
    updateScore={updateScore}
    answersSubmitted={answersSubmitted} />
  ));

  function checkAnswers() {
    setShowScore(true)
    setAnswersSubmitted(true)

    if(score === 10){
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      },9000)
    }
  }

  function resetQuiz() {
    setAnswersSubmitted(false);
    setShowScore(false);
    setScore(0);
    setStart(true);
  };
  
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
          <div className="score-container">
            {showScore && <h1 className="score-statement">You scored {score}/10 correct answers</h1>}
            {answersSubmitted ? (
              <button className="questions-btn" onClick={resetQuiz}>Play Again</button>
            ) : (
              <button className="questions-btn" onClick={checkAnswers}>Check Answers</button>
            )}
          </div>
          {showConfetti && <Confetti width={document.body.clientWidth} height={document.body.clientHeight}/>}
        </div>
      }
    </main>
  )
}

export default App



/* ------------------------------BUGS-------------------------------
1. The Counter updates whenever the option changes
2. Options need to be decoded
3. Options cannot be changed/ Changed options cannot be counted
*/

/* -------------------------Improvizations---------------------------
1. All the options except the correct options need to be blurred (Figma Design)
*/