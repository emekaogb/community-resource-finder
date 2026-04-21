import React from 'react'
import { useRoutes } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import ResourceDetails from './pages/ResourceDetails'
import ViewFavorites from './pages/ViewFavorites'
import ViewResources from './pages/ViewResources'
import './App.css'

const App = () => {
  const element = useRoutes([
    {
      path: '/resources',
      element: <ViewResources />
    },
    {
      path:'/login',
      element: <Login />
    },
    {
      path: '/resources/:id',
      element: <ResourceDetails />
    },
    {
      path: '/favorites',
      element: <ViewFavorites />
    }
  ])

  return (
    <div className='app'>

      <Header />

      { element }

    </div>
  )
}

export default App
