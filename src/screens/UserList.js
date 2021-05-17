import React from 'react';
import {Button, Card, Col, Container, Form, FormControl , InputGroup, Modal, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import { addUser, fetchAllUsers, toggleDeleteModal, toggleAddModal, deleteUser, searchUsers } from '../actions/userActions';
import { PersonPlus, Search } from 'react-bootstrap-icons';
import UserRow from '../components/UserRow';

class UserList extends React.Component{

    state={
        userEmail: null,
        userFirstName: null,
        userLastName: null,
        activeUserId: null
    }

    componentDidMount(){
        this.props.fetchAllUsers();
    }

    updateState = (fieldName, value) => {
        this.setState({
            [fieldName]: value
        })
    }

    handleAddUser = () => {
        const userPayload = {
            email: this.state.userEmail,
            first_name: this.state.userFirstName,
            last_name: this.state.userLastName
        }

        this.props.addUser(userPayload);
    }

    handleDeleteUser = () => {
        this.props.deleteUser(this.state.activeUserId);
    }

    render(){
        return(
            <Container>  
                    <Row className="d-flex justify-content-center">
                        <Col md={8} className="d-flex flex-column align-items-center justify-content-center">
                        <Form.Group className="w-100">
                            <InputGroup className="mb-3 mt-5 w-100" size="lg">
                            <InputGroup.Prepend>
                                <InputGroup.Text className="h-100" id="basic-addon1">
                                    <Search />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                                <FormControl
                                placeholder="Search by Full Name, Last Name and Email"
                                onChange={(e) => {this.props.searchUsers(e.target.value)}}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Card  className="w-100">
                    <Card.Body>
                        <div className="w-100 d-flex justify-content-end align-items-center">
                            <Button variant="primary" className="d-flex align-items-center mb-3" onClick={() => this.props.toggleAddModal(true)}>
                                <PersonPlus />
                                &nbsp;
                                Add a User
                            </Button>
                        </div>
                        {/* Add User Modal */}
                        <Modal show={this.props.userAdded} onHide={() => this.props.toggleAddModal(false)}>
                            <Modal.Header>
                            <Modal.Title>Add an User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form.Group className="w-100">
                            <InputGroup className=" w-100">
                                <FormControl
                                onChange={e => this.updateState('userFirstName', e.target.value)}
                                placeholder="First Name"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className=" mt-2 w-100">
                                <FormControl
                                onChange={e => this.updateState('userLastName', e.target.value)}
                                placeholder="Last Name"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mt-2 w-100">
                                <FormControl
                                onChange={e => this.updateState('userEmail', e.target.value)}
                                placeholder="Email"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.props.toggleAddModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleAddUser}>
                                Add User
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Delete User Modal */}
                        <Modal show={this.props.userDeleted} onHide={() => this.props.toggleDeleteModal(false)}>
                            <Modal.Header>
                            <Modal.Title className="text-danger">Delete an User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>This action will delete the user from system!</h5>
                                <h4>Are you Sure?</h4>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.props.toggleDeleteModal(false)}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={this.handleDeleteUser}>
                                Delete User
                            </Button>
                            </Modal.Footer>
                        </Modal>
                            {this.props.isSearchEnabled ? this.props.searchUsersList.map((item, index) => {
                                return(
                                    <UserRow
                                    key={index}
                                    email={item.email}
                                    first_name={item.first_name}
                                    last_name={item.last_name}
                                    avatar={item.avatar}
                                    id={item.id}
                                    updateState={this.updateState}
                                    toggleDeleteModal={this.props.toggleDeleteModal}
                                     />
                                )
                            }) : this.props.usersList.map((item, index) => {
                                return(
                                    <UserRow
                                    key={index}
                                    email={item.email}
                                    first_name={item.first_name}
                                    last_name={item.last_name}
                                    avatar={item.avatar}
                                    id={item.id}
                                    updateState={this.updateState}
                                    toggleDeleteModal={this.props.toggleDeleteModal}
                                     />
                                )
                            })}
                    </Card.Body>
                </Card>
                        </Col>
                    </Row>
                    
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        usersList: state.userReducer.usersList,
        fetchFailed: state.userReducer.fetchFailed,
        fetchFailedReason: state.userReducer.fetchFailedReason,
        activeUser: state.userReducer.activeUser,
        userDeleted: state.userReducer.userDeleted,
        userAdded: state.userReducer.userAdded,
        isSearchEnabled: state.userReducer.isSearchEnabled,
        searchUsersList: state.userReducer.searchUsersList
    }
  }

const mapDispatchToProps = (dispatch) => {
    return{
        fetchAllUsers: (params) => dispatch(fetchAllUsers(params)),
        toggleDeleteModal: (toggleValue) => dispatch(toggleDeleteModal(toggleValue)),
        toggleAddModal: (toggleValue) => dispatch(toggleAddModal(toggleValue)),
        addUser: (params) => dispatch(addUser(params)),
        deleteUser: (id) => dispatch(deleteUser(id)),
        searchUsers: (keyword) => dispatch(searchUsers(keyword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);