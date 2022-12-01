import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, darkTheme, lightTheme } from './theme/Theme.js'
import { useSelector } from 'react-redux'
import { selectIsDark } from './features/switch/switchSlice.js'
import Route from './Route.jsx'

function App() {
  const isTheme = useSelector(selectIsDark)
  return (
    <ThemeProvider theme={isTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Route />
    </ThemeProvider>
  )
}

export default App
