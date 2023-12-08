import { useEffect, useState } from 'react'
import axios from 'axios';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './assets/RouteComponent';

function App() {
  const [count, setCount] = useState(0)

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
