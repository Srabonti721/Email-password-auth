import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './layouts/Root.jsx'
import Home from './layouts/Home.jsx'
import Login from './component/Login.jsx'
import Register from './component/Register.jsx'
import SignIn from './component/SignIn.jsx'

const router = createBrowserRouter([
  {
    path:"/",
     Component:Root,
     children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:"/register",
        Component:Register
      }, 
      {
        path:'/signIn',
        Component:SignIn
      }
     ]
  }
 
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
