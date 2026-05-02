import { useRoutes } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import ResourceDetails from './pages/ResourceDetails'
import ViewFavorites from './pages/ViewFavorites'
import ViewResources from './pages/ViewResources'
import CreateReview from './pages/CreateReview'
import ViewReviews from './pages/ViewReviews'
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
    },
    {
      path: '/review/:id',
      element: <CreateReview />
    },
    {
      path: '/reviews',
      element: <ViewReviews />
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
