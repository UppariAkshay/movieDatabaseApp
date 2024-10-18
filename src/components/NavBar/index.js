import './index.css'
import {Link} from 'react-router-dom'

const NavBar = () => (
  <nav className="movieDbNAV">
    <h1>movieDB</h1>
    <div className="navOptionsContainerDIV">
      <Link to="/">
        <button className="removeBtnStyles">Popular</button>
      </Link>
      <Link to="/top-rated">
        <button className="removeBtnStyles">Top Rated</button>
      </Link>
      <Link to="/upcoming">
        <button className="removeBtnStyles">Upcoming</button>
      </Link>
    </div>
    <div>
      <input type="search" />
      <button>Search</button>
    </div>
  </nav>
)

export default NavBar
