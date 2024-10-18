import {withRouter, Link} from 'react-router-dom'

const MovieCard = props => {
  const {imagesUrlObjs, movieDetails} = props

  const posterUrl =
    imagesUrlObjs.base_url +
    imagesUrlObjs.poster_sizes[4] +
    movieDetails.poster_path

  // function onClickViewDetails() {
  //   const {match} = props
  //   const {path} = match
  //   const routePath = path + '/' + movieDetails.id
  //   return <Link to={routePath} />
  // }

  return (
    <li>
      <img src={posterUrl} alt={movieDetails.title} />
      <p>{movieDetails.title}</p>
      <p>{movieDetails.vote_average}</p>
      <button>View Details</button>
    </li>
  )
}

export default withRouter(MovieCard)
