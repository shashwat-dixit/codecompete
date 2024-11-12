import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import LandingLayout from '@/layouts/LandingLayout'
import Home from '@/pages/Home'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LandingLayout />}>
        <Route index element={<Home />} />
      </Route>
    ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
