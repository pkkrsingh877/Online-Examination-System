import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const AdminHome = () => {
    const { user } = useContext(UserContext);

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col>
                    <h2>Welcome, {user?.username || 'Admin'}!</h2>
                    <p>Manage your quizzes with the options below.</p>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-2">
                    <Button as={Link} to="/admin/quiz/create" variant="primary" className="w-100">
                        Create Quiz
                    </Button>
                </Col>
                <Col md={6} className="mb-2">
                    <Button as={Link} to="/admin/quiz" variant="secondary" className="w-100">
                        List Quizzes
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminHome;
