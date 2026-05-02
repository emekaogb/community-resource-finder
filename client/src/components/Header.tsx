import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client.tsx'
import defaultAvatar from '../assets/default_avatar.avif'
import '../css/Header.css'

function Header() {
  const { data: session } = authClient.useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (session === null) navigate('/login', { replace: true })
  }, [session, navigate])

  const handleSignOut = async () => {
    setDropdownOpen(false)
    await authClient.signOut()
  }

  return (
    <header className="header">
      <Link to={session ? "/resources" : "/login"} className="header__title-link">
        <h1 className="header__title">Community Resource Finder</h1>
      </Link>
      <div className="header__right">
        <Link to="/favorites" className="header__favorites-link">★</Link>
        {session && (
          <div className="header__user" ref={dropdownRef}>
            <button
              className="header__user-btn"
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              <img
                src={session.user.image ?? defaultAvatar}
                className="header__avatar"
                alt={session.user.name ?? 'User'}
              />
              <span className="header__username">{session.user.name}</span>
            </button>
            {dropdownOpen && (
              <div className="header__dropdown">
                <Link to="/reviews" className="header__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  My Reviews
                </Link>
                <button className="header__dropdown-item" onClick={handleSignOut}>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
