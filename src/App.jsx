import './App.css'
import Questions from './components/Questions'

function App() {

  return (
    <main>
      <h1 className='start-header'>Quizzical</h1>
      <p className='start-desc'>some description if needed</p>
      <button className='start-btn'>Start Quiz</button>
      <Questions />
    </main>
  )
}

export default App
