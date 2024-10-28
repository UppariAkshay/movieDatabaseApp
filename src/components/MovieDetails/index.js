import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieDBContext from '../../context/MovieDBContext'
import './index.css'

class MovieDetails extends Component {
  state = {isLoading: true, singleMovieDetails: [], castDetails: []}

  componentDidMount() {
    this.fetchSingleMovieDetails()
    this.fetchMovieCastDetails()
  }

  fetchSingleMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US`,
    )
    const responseData = await response.json()
    console.log(responseData)

    const movieDetails = {
      title: responseData.title,
      ratings: responseData.vote_average,
      duration: responseData.runtime,
      genre: responseData.genres,
      releaseDate: responseData.release_date,
      overview: responseData.overview,
      posterPath: responseData.poster_path,
    }

    this.setState({singleMovieDetails: movieDetails})
  }

  fetchMovieCastDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US`,
    )
    const responseData = await response.json()

    this.setState({castDetails: responseData, isLoading: false})
  }

  displayDetailedView = () => {
    const {singleMovieDetails, castDetails} = this.state
    const {posterPath, title, duration, genre, overview, ratings, releaseDate} =
      singleMovieDetails
    const {cast} = castDetails

    return (
      <MovieDBContext.Consumer>
        {value => {
          const {imagesUrlObjs} = value

          const posterUrl =
            imagesUrlObjs.base_url + imagesUrlObjs.poster_sizes[4] + posterPath

          const displayCast = eachCast => {
            const {name, original_name, profile_path} = eachCast
            const profileUrl =
              imagesUrlObjs.base_url +
              imagesUrlObjs.poster_sizes[4] +
              profile_path

            return (
              <li>
                <img src={profileUrl} />
                <p>{original_name}</p>
                <p>{name}</p>
              </li>
            )
          }

          return (
            <div>
              <NavBar />
              <div>
                <img src={posterUrl} />
                <p>{title}</p>
                <p>Duration {duration}</p>
                <ul>
                  {genre.map(eachGenre => (
                    <li key={eachGenre.id}>{eachGenre.name}</li>
                  ))}
                </ul>
                <p>Release date: {releaseDate}</p>
                <p>Ratings: {ratings}</p>
                <p>Overview: {overview}</p>
              </div>
              <ul>{cast.map(eachCast => displayCast(eachCast))}</ul>
            </div>
          )
        }}
      </MovieDBContext.Consumer>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <h1>Movie Details</h1>
        {isLoading ? <Loader /> : this.displayDetailedView()}
      </div>
    )
  }
}

export default MovieDetails
