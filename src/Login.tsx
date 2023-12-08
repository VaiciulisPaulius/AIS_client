import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import  { useNavigate } from 'react-router-dom'

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signin = useSignIn();
  const navigate = useNavigate();

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
        authState: res.data
      })
      navigate("/");
    })
  }

  return (
    <>
    <h1 className='text-center text-3xl'>AIS sistema</h1>
    <div className='grid place-content-center h-screen'>
      <div className='bg-slate-200 border-x-stone-400 border-2 px-4 pb-6 border-solid'>
        <h1 className='text-center text-xl px-4 m-1'>Prisijungimas</h1>
        <p>Prisijungimo vardas:</p>
        <input className='border-x-neutral-300 border-y-2 border-solid w-full mb-5' value={username} onChange={e => setUsername(e.target.value)} placeholder='Įveskite prisijungimo vardą...' type="text" />

        <p>Slaptažodis:</p>
        <input className='border-x-neutral-300 border-2 w-full mb-5' value={password} onChange={e => setPassword(e.target.value)} placeholder='Įveskite slaptažodį...' type="text" />

        <button className='block bg-blue-500 w-36 h-8 rounded-lg text-sky-950' onClick={onLoginSubmit}>Prisijungti</button>
      </div>
    </div>
    </>
  )
}

export default Login
