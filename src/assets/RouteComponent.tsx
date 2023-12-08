import { useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home';
import Login from '../Login';
import { RequireAuth } from 'react-auth-kit'

function RouteComponent() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/'} element={
        <RequireAuth loginPath={'/login'}>
          <Home></Home>
        </RequireAuth>
      }/>
    </Routes>
  )
}

export default RouteComponent
