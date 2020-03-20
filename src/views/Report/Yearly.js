import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import 'react-block-ui/style.css';

class Yearly extends Component {
  constructor(props) {
    super(props);  
  }

  render() {
    return (
      <div className="animated fadeIna pp flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="12" style={{textAlign: 'center', marginTop: '5.5%'}}>
              <img src={'../../../assets/img/under_construction.jpg'} style={{border: '3px solid black', borderRadius: '10px'}} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Yearly;