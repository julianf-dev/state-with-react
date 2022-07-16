import { UseReducer } from '../components/useReducer'
import { UseClass } from '../components/ClassState'

export function App() {
  return (
    <div className='App'>
      <UseReducer name="useReducer"/>
      <UseClass name="UseClass"/>
    </div>
  )
}
