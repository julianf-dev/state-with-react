import { UseState } from './useState'
import { UseClass } from './components/ClassState'

export function App() {
  return (
    <div className='App'>
      <UseState name={"useState"}/>
      <UseClass name={"UseClass"}/>
    </div>
  )
}
