import {Button, Col, Image, Row} from 'react-bootstrap';
import { Pen, Trash } from 'react-bootstrap-icons';
import {withRouter} from 'react-router-dom'

const UserRow = (props) => {
    let {email, first_name, last_name, avatar, id} = props;
    console.log('props: ', props);
    return(
        <Row className="py-3 w-100 m-0 border-top">
            <Col md={1} className="d-flex align-items-center" style={{paddingLeft: 0}}>
            <Image src={avatar} roundedCircle height={50} />
            </Col>
            <Col md={3} className="d-flex align-items-center">
            <h5 className="mb-0 mx-2">{first_name} {last_name}</h5>
            </Col>
            <Col md={4} className="d-flex align-items-center">
                <h5 className="mb-0 mx-2">{email}</h5>
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-between" style={{paddingRight: 0}}>
                <Button variant="outline-primary" size="sm" onClick={() => {
                    props.history.push('/user/details/' + id)
                }}>
                    <Pen />
                    &nbsp;
                    Edit User
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => {
                    props.updateState('activeUserId', id);
                    props.toggleDeleteModal(true)
                }}>
                    <Trash />
                    &nbsp;
                    Delete User
                </Button>
            </Col>
        </Row>
    )    
}

export default withRouter(UserRow) 