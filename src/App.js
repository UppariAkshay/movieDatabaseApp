import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import MovieDBContext from './context/MovieDBContext'
import SearchMoviesParent from './components/SearchMoviesParent'

// write your code here
class App extends Component {
  state = {imagesUrlObjs: [], isLoading: true, searchKeyword: ''}

  componentDidMount() {
    this.getImageUrl()
  }

  getImageUrl = async () => {
    const url = 'https://api.themoviedb.org/3/configuration'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzNmZDI3ZjQ5ZDQxM2QzM2NkODEzNzg5Y2ZiY2Q4YyIsIm5iZiI6MTcyOTE0ODMyMy4xOTMyODMsInN1YiI6IjY3MTBiMzBmY2Y4ZGU4NzdiNDlmYTNjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-D-jzjtxIyKg_owmCo554O1tFVmr-DjE2HRkVobZ_II',
      },
    }

    const response = await fetch(url, options)
    const responseData = await response.json()

    this.setState({imagesUrlObjs: responseData.images, isLoading: false})
  }

  onChangeSearchkeyword = newSearchKeyword => {
    console.log(newSearchKeyword)
    this.setState({searchKeyword: newSearchKeyword})
  }

  displayApp = () => {
    const {imagesUrlObjs, searchKeyword} = this.state

    return (
      <MovieDBContext.Provider
        value={{
          imagesUrlObjs,
          searchKeyword,
          onChangeSearchkeyword: this.onChangeSearchkeyword,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route
            exact
            path="/single-movie-details/:id"
            component={MovieDetails}
          />
          <Route exact path="/search-movies" component={SearchMoviesParent} />
        </Switch>
      </MovieDBContext.Provider>
    )
  }

  render() {
    const {isLoading} = this.state

    return <div>{isLoading ? <Loader /> : this.displayApp()}</div>
  }
}

export default App
