// imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

// layouts
import LandingLayout from '@/layouts/LandingLayout'

// pages
import Home from '@/pages/Home'
import Compete from '@/pages/Compete'
import Problems from '@/pages/Problems'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import Rankings from '@/pages/Rankings'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LandingLayout />}>
        <Route index element={<Home />} />
        <Route path='/compete' element={<Compete />} />
        <Route path='/problems' element={<Problems />} />
        <Route path='/rankings' element={<Rankings />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<Profile />} />
        {/* reminder -  the user route needs to be dynamic.*/}
      </Route>
    ))

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
