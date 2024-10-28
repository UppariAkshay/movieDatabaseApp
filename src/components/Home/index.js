import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import MovieDBContext from '../../context/MovieDBContext'
import './index.css'

class Home extends Component {
  state = {isLoading: true, popularMoviesList: []}

  componentDidMount() {
    this.getPopularMoviesURL()
  }

  getPopularMoviesURL = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US&page=1',
    )
    const responseData = await response.json()

    this.setState({popularMoviesList: responseData.results, isLoading: false})
  }

  displayPopularMovies() {
    const {popularMoviesList} = this.state

    return (
      <MovieDBContext.Consumer>
        {value => {
          const {imagesUrlObjs} = value

          return (
            <ul className="moviesContainerUL">
              {popularMoviesList.map(eachMovie => (
                <MovieCard
                  key={eachMovie.id}
                  imagesUrlObjs={imagesUrlObjs}
                  movieDetails={eachMovie}
                />
              ))}
            </ul>
          )
        }}
      </MovieDBContext.Consumer>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <NavBar />
        {isLoading === true ? <Loader /> : this.displayPopularMovies()}
      </div>
    )
  }
}

export default Home
