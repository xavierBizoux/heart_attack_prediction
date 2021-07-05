import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Instance from '../apis/Instance';

import { AuthContext } from '../contexts';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

function Logon() {
    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const history = useHistory();
    let userInput = React.createRef();
    let passwordInput = React.createRef();
    const authenticate = (event) => {
        event.preventDefault();
        const endpoint = "/SASLogon/oauth/token";
        const user = userInput.current.value;
        const password = passwordInput.current.value;
        const data = {
            grant_type: "password",
            response_type: "bearer",
            username: user,
            password: password
        };

        const headers = {
            'Authorization': "Basic " + btoa('gel_app:gel_secret'),
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        Instance.post(endpoint, new URLSearchParams(data), { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    Instance.defaults.headers.common['Authorization'] = `${response.data.token_type} ${response.data.access_token}`;
                } else {
                    Instance.defaults.headers.common['Authorization'] = null;
                }
                setAuthInfo({
                    ...authInfo,
                    authenticated: true,
                    user: user,
                    tokenInfo: response.data
                });
                history.goBack();
                return null;
            });
    }
    return (
        <Container>
            <Form onSubmit={authenticate}>
                <Form.Row className='justify-content-md-center'>
                    <Col className='col-4'>
                        <Form.Control ref={userInput} type="input" placeholder="Login" />
                    </Col>
                    <Col className="col-4">
                        <Form.Control ref={passwordInput} type="password" placeholder="Password" />
                    </Col>
                    <Col className="col-1">
                        <Button variant="primary" type="submit">Logon</Button>
                    </Col>
                </Form.Row>
            </Form>
            <Row className="justify-content-md-center p-3">
                <Col md='{{span:10}}'>
                    {alert.length > 0 ? <Alert variant='danger'>{alert}</Alert> : null}
                </Col>
            </Row>
        </Container>
    )
}

export default Logon;