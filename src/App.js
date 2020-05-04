import React, {Component} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetail from './components/movie-detail';
import MovieForm from './components/movie-form';
import { withCookies } from 'react-cookie';

var FontAwesome = require('react-fontawesome');

class App extends Component{


  state = {
    myMovies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mToken')
  }


  componentDidMount(){

    if(this.state.token){
    // to get data from api 
    fetch('http://127.0.0.1:8000/api/movies/', {
    
      method: 'GET',
      headers: {'Authorization': `Token ${this.state.token}` }
      }).then(res => res.json())
      .then(resp => this.setState({myMovies: resp}))
      .catch(err => console.log(err));     
    }else{
      window.location.href = '/';
    }

  }


  // a function with one args which will be revieving data from other component....
  // loading a movie... 
  movieClicked = (recievemovie) => {
    this.setState({selectedMovie: recievemovie, editedMovie: null})
  }

  movieDeleted = selMovie => {
    // if selMovie is not equal to true it will return true,,,
    const movies = this.state.myMovies.filter(movie => movie.id !== selMovie.id)
    this.setState({myMovies: movies, selectedMovie: null})
  }

  editClicked = selMovie => {
    this.setState({editedMovie: selMovie});
   }

  newMovie = () =>{
    this.setState({editedMovie: {'title':'', 'description': ''}});
  } 

  addMovie = movie => {
    // we use the Spread Operator to keep the current list wothout refreshing the page and add new movie...
    this.setState({myMovies: [...this.state.myMovies, movie]})
  }


  
  render(){
    return (

      <div className="App">
        <h1>
        <FontAwesome name='film'/>
           <span>Movie Rater App</span>
         </h1>

          <div className="layout">
            <MovieList movies={this.state.myMovies}  movie={this.movieClicked} 
                movieDelete={this.movieDeleted} editClicked={this.editClicked}
                newMovie = {this.newMovie}  token={this.state.token}/>
             
               <React.Fragment>  
                 { 
                  !this.state.editedMovie ? 
                    <MovieDetail movie_detail ={this.state.selectedMovie} updateMovie={this.movieClicked} token={this.state.token}/>

                  : <MovieForm movie={this.state.editedMovie} cancelClicked={this.editClicked} newMovie={this.addMovie}
                   updateMovie={this.movieClicked} token={this.state.token} />}
              </React.Fragment>
          </div>
      </div>
    )
    }

}


export default withCookies(App);