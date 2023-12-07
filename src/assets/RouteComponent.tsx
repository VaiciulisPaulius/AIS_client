import { useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home';
import Login from '../Login';
import { RequireAuth } from 'react-auth-kit'

function RouteComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
      axios.get("http://localhost:8080/authenticate/login", {
        params: {
          username: "Paulius",
          password: "Vaičiulis"
        }
      }).then(res => console.log(res))
  }, [count])

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
