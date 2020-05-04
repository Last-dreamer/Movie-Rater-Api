import React, {Component} from 'react';
var FontAwesome = require('react-fontawesome');

class MovieDetail extends Component{
 
   state ={
       highlighted: -1,
   }

   MouseHighlighted = high => (evt) =>{
       this.setState({highlighted: high})
   }
   
   rateClicked = stars => evt => {
       fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie_detail.id}/rate_movie/`, {
         method: 'POST',
         headers: {
            'Content-Type':'application/json',
             'Authorization': `Token ${this.props.token}`
             },
         
        body: JSON.stringify({stars: stars+1})    
         })
         .then(res => res.json())
         .then(resp => this.getDetail())
         .catch(err => console.log(err));
        
   }

   getDetail = () => {

    fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie_detail.id}/`, {
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Token ${this.props.token}`
             },
            })
         .then(res => res.json())
         .then(resp => this.props.updateMovie(resp))
         .catch(err => console.log(err));
        
   }

   render(){
       const mov = this.props.movie_detail;
       return (
           <div>

               { mov ? (
                   <div>
                       <h3>{mov.title}</h3>

                       <FontAwesome name='star' className={mov.avg_rating > 0 ? 'orange' : ''}/>
                       <FontAwesome name='star' className={mov.avg_rating > 1 ? 'orange' : ''}/>
                       <FontAwesome name='star' className={mov.avg_rating > 2 ? 'orange' : ''}/>
                       <FontAwesome name='star' className={mov.avg_rating > 3 ? 'orange' : ''}/>
                       <FontAwesome name='star' className={mov.avg_rating > 4 ? 'orange' : ''}/>
                       
                       ({mov.no_of_rating})

                       <h5>{mov.description}</h5>

                           <div className='rate-container'>
                               <h2>Rate-it !!..</h2>
                               {
                                   [...Array(5)].map((e,i) => {
                                       return <FontAwesome name='star' key={i} className={ this.state.highlighted > i-1 ? 'purple' : ''}
                                      onMouseEnter={this.MouseHighlighted(i)} onMouseLeave={this.MouseHighlighted(-1)} 
                                      onClick={this.rateClicked(i)}/>
                                   })
                               }

                           </div>
                   </div>
               ):null } 
           </div>
       )
   }

}

export default MovieDetail;