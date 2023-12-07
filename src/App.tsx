import { useEffect, useState } from 'react'
import axios from 'axios';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './assets/RouteComponent';

function App() {
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
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
        <RouteComponent />
    </AuthProvider>
  )
}

export default App
