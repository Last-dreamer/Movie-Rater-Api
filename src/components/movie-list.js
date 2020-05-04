import React from 'react';
import '../App.css';
var FontAwesome = require('react-fontawesome');

function MovieList(props){
 
    // An arrow function which take two args.....
    const movieClicked = Movie => (evt) =>{
          props.movie(Movie);
    }


    const  removeClicked = movie => {
    fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
        method: 'DELETE',
        headers: {
           'Content-Type':'application/json',
            'Authorization': `Token ${this.props.token}`
            },
           })
        .then(res => props.movieDelete(movie))
        .catch(err => console.log(err));
       

    }

    const editClick = movieIndex => {
        props.editClicked(movieIndex);
    }

    const newmovie = () => {
        props.newMovie();
    }

    return (
        <div>
            {
            props.movies.map(movie =>{

                return <div className='movie-item' key={movie.id}>
                    <p  onClick={movieClicked(movie)}> {movie.title} </p>
                    
                    <FontAwesome name='edit' onClick={() => editClick(movie)}/>
                    <FontAwesome name='trash' onClick={() => removeClicked(movie)}/>
                   </div>
            })
        }
         <button onClick={newmovie}>Add New</button>
        </div>
    )

}


export default MovieList;