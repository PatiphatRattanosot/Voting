import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import { Web3Provider } from './useContexts/Web3Context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3Provider>
      <RouterProvider router={router} />
    </Web3Provider>
  </StrictMode>,
)
