import { Link } from 'react-router-dom'
import '../css/Header.css'

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Community Resource Finder</h1>
      <Link to="/favorites" className="header__favorites-link">☆</Link>
    </header>
  )
}

export default Header
