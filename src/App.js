import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

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
    return (
    <section class="container">
      { isLoading ? (
        <div class ="loader">
         <span class ="loader__test">Loaidng...</span>
        </div>
      ) : (
        <div class="movies">
          {movies.map(movie => (          
            <Movie  
            key={movie.id}
            id={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
          />
          ))}
        </div>
      )}
      </section>
    )
  }
}

export default App;
