import {Component} from 'react'
import './index.css'

class MovieDetails extends Component {
  state = {}

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

    const movieDetails = {
      title: responseData.title,
      ratings: responseData.vote_average,
      duration: responseData.runtime,
      genre: responseData.genres,
      releaseDate: responseData.release_date,
      overview: responseData.overview,
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

    this.setState({castDetails: responseData})
  }

  render() {
    return <h1>Movie Details</h1>
  }
}

export default MovieDetails
