import React, { Component } from 'react'
import './home.css';
class Home extends Component {
    state = { user:{} }
    componentDidMount(){
        const user=JSON.parse(localStorage.getItem("user"));
        if(user){
this.setState({user});
        }
        else{
            window.location.replace("/login");
        }
    }
    logout(){
        localStorage.clear()
        window.location.replace("/login")
    }
    render() { 
        if(this.state.user){
        return ( <React.Fragment>
<div className="container">
    <div className="half welcome-tex">
        <div>
        <img src="./images/header-logo.svg" alt="instabug" /></div>
        <div>
            
        <h2>Welcome to <br/> { this.state.user.email}</h2></div>
        
        <div className="btn-log-out">
            <button className="log-out-btn" onClick={this.logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
        </div>
        
        
        </div>
    <div className="half">
    <img className="img" src="./images/home-hero.svg" alt="home-hero" />
   
          </div>
    
</div>
        </React.Fragment> );
    }}
}
 
export default Home;