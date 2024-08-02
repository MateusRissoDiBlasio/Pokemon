import { AppRoutes } from '../src/Pages/routes'
import './App.css'
import { ThemeProvider } from './Context/theme'

function App() {

  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>

  )
}

export default App
