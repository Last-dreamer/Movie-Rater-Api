import React, {Component} from 'react';

class MovieForm extends Component{


  state = {      
    editMovie: this.props.movie,
  }

  cancelClick = () => {
      this.props.cancelClicked();
  }

  inputChanged = (evt) => {
      let movie = this.state.editMovie;
      movie[evt.target.name] = evt.target.value;
      this.setState({editMovie: movie})
  }

  updateClicked = (evt) => {
    fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/`, {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Token ${this.props.token}`
          },
      
      body: JSON.stringify(this.state.editMovie)    
      })
      .then(res => res.json())
      .then(resp => this.props.updateMovie(resp))
      .catch(err => console.log(err));
  }

  savedClicked = (evt) => {
    fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Token ${this.props.token}`
          },
          
      body: JSON.stringify(this.state.editMovie)    
      })
      .then(res => res.json())
      .then(resp => this.props.newMovie(resp))
      .catch(err => console.log(err));
  }

  render(){
    const  isDisabled = this.state.editMovie.title.length === 0 || this.state.editMovie.description.length === 0;
    return (
        <div>
             <h2>Title</h2>
             <input type='text'  name='title' value={this.props.movie.title} onChange={this.inputChanged}/><br/>
             <h2>Description</h2>
             <textarea  name= 'description' value={this.props.movie.description} onChange={this.inputChanged}/><br/>

             { this.props.movie.id ? <button disabled={this.disabled} onClick={this.updateClicked}>Update</button> :
               <button disabled={isDisabled} onClick={this.savedClicked}>Save</button>
              }
              &nbsp;
             <button disabled={isDisabled} onClick={this.cancelClick}>Cancel</button>
             
        </div> 
     )
    }
}

export default MovieForm;
