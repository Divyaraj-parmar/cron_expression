import './App.css'
import CronExpressionEvaluator from './components/CronExpressionEvaluator'
import RecurrencePatternGenerator from './components/RecurrencePatternGenerator'

function App() {

  return (
    <div className="App">
    <header className="App-header">
      <h1>Cron Expression Visualizer</h1>
    </header>
    <main>
      <div className="container">
        <h2>Part 1: Cron Expression Evaluator</h2>
        <CronExpressionEvaluator />
        
        <h2>Part 2: Recurrence Pattern Generator</h2>
        <RecurrencePatternGenerator />
      </div>
    </main>
  </div>
  )
}

export default App

