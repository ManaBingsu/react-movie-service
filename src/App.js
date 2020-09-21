import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./Movie";

const listAPI = "https://yts-proxy.now.sh/list_movies.json?sort_by=rating";

class App extends React.Component{
  state = {
    isLoading : true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: { 
        data: { movies }
      }
    } = await axios.get(listAPI);
    this.setState({ movies, isLoading: false })
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return <div>{isLoading ? "Loading"
    : movies.map(movie => (
      <Movie
        key={movie.id}
        id={movie.id}
        year={movie.year} 
        title={movie.title} 
        summary={movie.summary} 
        poster={movie.medium_cover_image} 
      />
    ))}</div>
  }
}

export default App;
