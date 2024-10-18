import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';  // Tailwind CSS stil dosyasını ekleyin


createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
)
