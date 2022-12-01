import React from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { makeServer } from './server'
import App from './App.jsx'

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' })
}

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
