import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, authClient } from '../lib/auth-client'
import googleLogo from '../assets/google.jpg'
import '../css/Login.css'

function Login() {
  const { data: session } = authClient.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (session) navigate('/resources', { replace: true })
  }, [session, navigate])

  return (
    <div className="login">
      <div className="login__card">
        <h2 className="login__title">Welcome</h2>
        <p className="login__subtitle">Sign in to save and manage your favourite community resources.</p>
        <button className="login__google-btn" onClick={signIn}>
          <img src={googleLogo} alt="Google" className="login__google-icon" />
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default Login
