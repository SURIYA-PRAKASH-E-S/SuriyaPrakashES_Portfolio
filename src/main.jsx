import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // This should import your CSS
import App from './App.jsx'

//Created by @suriyaes

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// Made With ❤️by Suriya Prakash E S