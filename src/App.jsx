import { useState } from 'react'
import './App.css'
import Questions from './components/Questions'

function App() {

  const [start, setStart] = useState(true);

  function handleClick() {
    setStart(false)
  }

  return (
    <main>
      { start ?
        <div>
          <h1 className='start-header'>Quizzical</h1>
          <p className='start-desc'>some description if needed</p>
          <button className='start-btn' onClick={handleClick}>Start Quiz</button>
        </div> :
        <Questions />
      }
    </main>
  )
}

export default App
