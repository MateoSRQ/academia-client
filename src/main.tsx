import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './pages/app'
import Login from './pages/login'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/app" element={<App />} />
              <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
