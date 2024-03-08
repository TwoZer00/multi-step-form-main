import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import './index.css'
import AddOns from './pages/AddOns'
import PersonalInfo from './pages/PersonalInfo'
import SelectPlan from './pages/SelectPlan'
import Summary from './pages/Summary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <PersonalInfo />
      },
      {
        path: '/select-plan',
        element: <SelectPlan />,
      },
      {
        path: '/add-ons',
        element: <AddOns />
      },
      {
        path: '/summary',
        element: <Summary />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
