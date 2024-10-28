import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import MovieDBContext from '../../context/MovieDBContext'
import './index.css'

class Upcoming extends Component {
  state = {upcomingMovies: [], isLoading: true}

  componentDidMount() {
    this.fetchUpcomingMovies()
  }

  fetchUpcomingMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US&page=1',
    )
    const responseData = await response.json()

    this.setState({upcomingMovies: responseData.results})
  }

  displayUpcomingMovies() {
    const {upcomingMovies} = this.state

    return (
      <MovieDBContext.Consumer>
        {value => {
          const {imagesUrlObjs} = value

          return (
            <ul className="upcomingMoviesContainerUL">
              {upcomingMovies.map(eachMovie => (
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

  movieCard(movieDetails) {
    const {imagesUrlObjs} = this.state
    console.log(imagesUrlObjs)

    const posterUrl =
      imagesUrlObjs.base_url +
      imagesUrlObjs.poster_sizes[4] +
      movieDetails.poster_path
    console.log(posterUrl)

    return (
      <li>
        <img src={posterUrl} alt={movieDetails.title} />
        <p>{movieDetails.title}</p>
        <p>{movieDetails.vote_average}</p>
        <button>View Details</button>
      </li>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <NavBar />
        {isLoading === true ? <Loader /> : this.displayUpcomingMovies()}
      </div>
    )
  }
}

export default Upcoming
