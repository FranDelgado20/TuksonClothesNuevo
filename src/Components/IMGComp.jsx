import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const IMGComp = () => {
  return (
    <Container>
      <Row>
        <Col md={6} className="d-flex  justify-content-center">
          
            <Image
              src="public/img/png-transparent-computer-icons-user-username-avatar-person-skill.png"
              width={"100px"}
              rounded
            />
          
        </Col>
        <Col md={6} >
          <Form.Group className="position-relative mb-3">
            <Form.Control type="file" required name="file" />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default IMGComp;
