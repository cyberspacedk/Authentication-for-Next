import React, {useState} from 'react';
import Router from 'next/router';
import { getCsrfToken, getProviders, signIn, getSession } from "next-auth/react"

export default function SignIn({ csrfToken, providers, ...r }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: null
  });
  const [formError, setFormError] = useState(null);

  const handleChange = ({target}) => {
    setFormData(prev => ({...prev, [target.name]: target.value}))
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password
    });

    if(res?.error) {
      setFormError(res.error);
      return;
    }

    Router.push('/');
  }
  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        email: formData.email,
        password: formData.password
      })
    });

    const data = await res.json();
    
    if(data.success){
      Router.push('/')
    }
  }
  
  return (
    <> 
      <p>Sign in using traditional way</p> 
      <form onSubmit={handleLogin}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <label>
          Email address
          <input type="email" id="email" name="email" onChange={handleChange} value={formData.email}/>
        </label>

        <label>
          Password
          <input type="password" id="password" name="password" onChange={handleChange} value={formData.password}/>
        </label>

        {formError && <span style={{color:'red'}}>{formError}</span>}

        <button type="submit">Sign In</button>
        <button onClick={handleRegister}>Sign Up</button>
      </form> 
    </>
  )
}

export async function getServerSideProps({req, ...restCtx}) {
  const session = await getSession({ req });
  
  if(session){
    return {
      redirect: {
        destination: '/'
      }
    }
  }
  const csrfToken = await getCsrfToken(restCtx);
  const providers = await getProviders();

  return {
    props: { csrfToken, providers },
  }
}