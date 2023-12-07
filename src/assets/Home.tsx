import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSignOut } from 'react-auth-kit';

function Home() {
    const useSignout = useSignOut();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={useSignout}>Signout</button>
    </div>
  )
}

export default Home
