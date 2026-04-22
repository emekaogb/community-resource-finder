import { Link } from 'react-router-dom'
import { authClient } from '../lib/auth-client.tsx'
import defaultAvatar from '../assets/default_avatar.avif'
import '../css/Header.css'

function Header() {
  const { data: session } = authClient.useSession()

  return (
    <header className="header">
      <h1 className="header__title">Community Resource Finder</h1>
      <div className="header__right">
        <Link to="/favorites" className="header__favorites-link">☆</Link>
        {session && (
          <div className="header__user">
            <img
              src={session.user.image ?? defaultAvatar}
              className="header__avatar"
              alt={session.user.name ?? 'User'}
            />
            <span className="header__username">{session.user.name}</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
