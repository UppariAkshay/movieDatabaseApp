import './index.css'
import {Link, withRouter} from 'react-router-dom'
import MovieDBContext from '../../context/MovieDBContext'

const NavBar = props => (
  <MovieDBContext.Consumer>
    {value => {
      const {onChangeSearchkeyword} = value

      const onChangeSearchInput = event => {
        onChangeSearchkeyword(event.target.value)
      }

      const onClickSearch = () => {
        const {history} = props
        history.push('/search-movies')
      }

      return (
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
            <input onChange={onChangeSearchInput} type="search" />
            <button onClick={onClickSearch}>Search</button>
          </div>
        </nav>
      )
    }}
  </MovieDBContext.Consumer>
)

export default withRouter(NavBar)
