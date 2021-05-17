import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Home extends React.Component{
    render(){
        return(
          this.props.userLoggedIn ? (
            <Redirect to="/all-users" />
          ) : (
            <Redirect to="/login" />
          )
        )
    }
}


const mapStateToProps = (state) => {
  return{
    userLoggedIn: state.authReducer.userLoggedIn,
  }
}
  

export default connect(mapStateToProps)(Home)