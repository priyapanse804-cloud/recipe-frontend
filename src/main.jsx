import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter} from "react-router";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <createBrowserRouter>
  <App/>
  </createBrowserRouter>
)
