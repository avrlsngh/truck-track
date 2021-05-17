import React from 'react';
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchUser, updateUserDetails, updateUser } from '../actions/userActions';

class User extends React.Component{

    handleUpdate = () => {
        this.props.updateUser()
    }

    componentDidMount(){
        const userId = this.props.match.params.id;
        this.props.fetchUser(userId);
    }

    render(){
        return(
            <Row className="d-flex justify-content-center mt-5">
                <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                <Card  className="w-100">
                <Card.Body>
                <Form.Group className="w-100">
                    <InputGroup className=" w-100">
                        <FormControl
                        value={this.props.first_name === undefined ? '' : this.props.first_name}
                        onChange={e => this.props.updateUserDetails('first_name', e.target.value)}
                        placeholder="First Name"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className=" mt-2 w-100">
                        <FormControl
                        value={this.props.last_name === undefined ? '' : this.props.last_name}
                        onChange={e => this.props.updateUserDetails('last_name', e.target.value)}
                        placeholder="Last Name"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mt-2 w-100">
                        <FormControl
                        value={this.props.email === undefined ? '' : this.props.email}
                        onChange={e => this.props.updateUserDetails('email', e.target.value)}
                        placeholder="Email"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    </Form.Group>
                    <div className="w-100 d-flex justify-content-end mt-3">
                        <Button variant={'primary'} onClick={this.handleUpdate}>Update Details</Button>
                    </div>
                </Card.Body>
                </Card>
                    
                </Col>
            </Row>
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
        email: state.userReducer.userDetails.email,
        first_name: state.userReducer.userDetails.first_name,
        last_name: state.userReducer.userDetails.last_name
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchUser: (id) => dispatch(fetchUser(id)),
        updateUserDetails: (fieldName, value) => dispatch(updateUserDetails(fieldName,  value)),
        updateUser: () => dispatch(updateUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);