import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieDBContext from '../../context/MovieDBContext'
import MovieCard from '../MovieCard'

class SearchMovies extends Component {
  state = {searchResults: [], isLoading: true}

  componentDidMount() {
    this.fetchSearchResults()
  }

  fetchSearchResults = async () => {
    const {searchKeyword} = this.props

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US&query=${searchKeyword}&page=1`,
    )
    const responseData = await response.json()

    this.setState({searchResults: responseData, isLoading: false})
  }

  displaySearchedMovies = () => {
    const {searchResults} = this.state
    const {results} = searchResults

    const {imagesUrlObjs} = this.props

    return (
      <div>
        <h1>searched movies</h1>
        <NavBar />
        <ul>
          {results.map(eachMovie => (
            <MovieCard movieDetails={eachMovie} imagesUrlObjs={imagesUrlObjs} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    console.log('search movies')

    return isLoading ? <Loader /> : this.displaySearchedMovies()
  }
}

export default SearchMovies
