import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import MovieDBContext from '../../context/MovieDBContext'
import './index.css'

class TopRated extends Component {
  state = {topRatedMovies: [], isLoading: true}

  componentDidMount() {
    this.fetchTopRatedMovies()
    this.getImageUrl()
  }

  fetchTopRatedMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US&page=1',
    )
    const responseData = await response.json()

    this.setState({topRatedMovies: responseData.results})
  }

  displayTopRatedMovies() {
    const {topRatedMovies} = this.state

    return (
      <MovieDBContext.Consumer>
        {value => {
          const {imagesUrlObjs} = value

          return (
            <ul className="topRatedMoviesContainerUL">
              {topRatedMovies.map(eachMovie => (
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

  // movieCard(movieDetails) {
  //   const {imageUrlObj} = this.state
  //   const posterUrl =
  //     imageUrlObj.base_url +
  //     imageUrlObj.poster_sizes[4] +
  //     movieDetails.poster_path

  //   return (
  //     <li>
  //       <img src={posterUrl} alt={movieDetails.title} />
  //       <p>{movieDetails.title}</p>
  //       <p>{movieDetails.vote_average}</p>
  //       <button>View Details</button>
  //     </li>
  //   )
  // }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <NavBar />
        <h1>Top Rated</h1>
        {isLoading === true ? <Loader /> : this.displayTopRatedMovies()}
      </div>
    )
  }
}

export default TopRated
