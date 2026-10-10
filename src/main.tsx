import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


import Home from './pages/Home.tsx';
import Battle from './pages/Battle.tsx';
import CharacterInfo from './pages/CharacterInfo';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/battleSimulator",
        element: <Battle />
      },
      {
        path: "/battleSimulatorRPG",
        element: <Battle />
      },
      {
        path: "/characterInfo",
        element: <CharacterInfo />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
