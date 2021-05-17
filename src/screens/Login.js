import React from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userLogin } from '../actions/authActions';

class Login extends React.Component{
    state = {
        email: null,
        password: null
    }

    updateFormState = (fieldName, value) => {
        this.setState({
            [fieldName]: value
        })
    }

    userLogin = () => {
        this.props.userLogin(this.state);
    }
    render(){
        return(
            this.props.userLoggedIn ? (
                <Redirect to="/all-users" />
            ) : (
                <Container>
                <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="mt-5">
                        <Card.Body>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" onChange={e => {
                            this.updateFormState('email', e.target.value);
                        }} />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" onChange={e => {
                            this.updateFormState('password', e.target.value);
                        }} />
                    </Form.Group>
                    <div className="w-100 d-flex justify-content-between align-items-center mt-3">
                    <span>
                    New Here?&nbsp;
                    <Link to="/register">Register Yourself</Link>
                    </span>
                    <Button variant="primary" type="button" onClick={this.userLogin}>
                        Submit
                    </Button>
                    </div>
                    </Card.Body>
                    </Card>
                </Col>
                </Row>
                </Container>
            )
        )
    }
}

const mapStateToProps = (state) => {
    return{
      userLoggedIn: state.authReducer.userLoggedIn,
      loggingIn: state.authReducer.loggingIn,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return{
        userLogin: (params) => dispatch(userLogin(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);