import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signin = useSignIn();

  const onLoginSubmit = () => {
    axios.get("http://localhost:8080/authenticate/login", {
      params: {
        username: username,
        password: password
      }
    }).then(res => {
      if(res == null) return;
      console.log(res)
      signin({
        token: res.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { username: res.data.username }
      })
    })
  }

  return (
    <div>
      <h1>AIS sistema</h1>
      <h2>Prisijungimas</h2>
      <p>Prisijungimo vardas:</p>
      <input value={username} onChange={e => setUsername(e.target.value)} type="text" />

      <p>Slaptažodis:</p>
      <input value={password} onChange={e => setPassword(e.target.value)} type="text" />

      <button onClick={onLoginSubmit}>Prisijungti</button>

    </div>
  )
}

export default Login
