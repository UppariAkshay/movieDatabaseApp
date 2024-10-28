import {withRouter, Link, Redirect} from 'react-router-dom'

const MovieCard = props => {
  const {imagesUrlObjs, movieDetails} = props

  const posterUrl =
    imagesUrlObjs.base_url +
    imagesUrlObjs.poster_sizes[4] +
    movieDetails.poster_path

  const {id} = movieDetails

  const onClickViewDetails = () => {
    const {history} = props
    history.push(`/single-movie-details/${id}`)
  }

  return (
    <li>
      <img src={posterUrl} alt={movieDetails.title} />
      <p>{movieDetails.title}</p>
      <p>{movieDetails.vote_average}</p>
      <button onClick={onClickViewDetails}>View Details</button>
    </li>
  )
}

export default withRouter(MovieCard)
