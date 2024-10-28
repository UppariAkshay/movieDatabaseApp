import SearchMovies from '../SearchMovies'
import MovieDBContext from '../../context/MovieDBContext'

const SearchMoviesParent = () => {
  return (
    <MovieDBContext.Consumer>
      {value => {
        const {searchKeyword, imagesUrlObjs} = value

        return (
          <SearchMovies
            searchKeyword={searchKeyword}
            imagesUrlObjs={imagesUrlObjs}
          />
        )
      }}
    </MovieDBContext.Consumer>
  )
}

export default SearchMoviesParent
