import React, { Component } from 'react';
import { withCookies }  from 'react-cookie';

class Login extends Component{


    state = {
        credentials: {
            username: '',
            password: ''
        },

        isLogInView: true
    }

    inputChanged = (evt) => {
        const cred = this.state.credentials;
        cred[evt.target.name] = evt.target.value;
        this.setState({credentials: cred});
    }


    login = () => {
        if(this.state.isLogInView){
            fetch(`http://127.0.0.1:8000/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'},
                body: JSON.stringify(this.state.credentials)    
                })
                .then(res => res.json())
                .then(resp => {
                     console.log(resp.token);
                     this.props.cookies.set('mToken', resp.token)
                     window.location.href = 'movies/';
                    })
                .catch(err => console.log(err));
           

        }else{
            fetch(`http://127.0.0.1:8000/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'},
                body: JSON.stringify(this.state.credentials)    
                })
                .then(res => res.json())
                .then(resp => this.setState({isLogInView: true}))
                .catch(err => console.log(err));
           

        }
    }

    toggleView = ( ) =>{
        this.setState({isLogInView: !this.state.isLogInView});
    }

    render(){
        return <div className='myContainer'>
                <h1>{this.state.isLogInView ? 'LogIn' : 'Register'}</h1>
                <br/>
                <span>Username</span>
                <input type='text' name='username' onChange={this.inputChanged} value={this.state.credentials.username}/>
                 <br/>
                 <br/>
                <span>Password</span>
                <input type='password' name='password' onChange={this.inputChanged} value={this.state.credentials.password}/>
                <br/>
                <br/>
                 <button onClick={this.login}>{this.state.isLogInView ? 'LogIn' : 'Register' }</button>
                <br/>
                <p onClick={this.toggleView}>{this.state.isLogInView ? 'Created new account..!': 'Back to LogIn..!'}</p>


           </div>
    }
}


export default withCookies(Login);