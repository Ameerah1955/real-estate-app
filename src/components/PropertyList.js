import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Card, Container, Row, Col } from "react-bootstrap";

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get("/properties").then((response) => setProperties(response.data));
  }, []);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Property Listings</h1>
      <Row>
        {properties.map((property) => (
          <Col md={4} sm={6} xs={12} key={property.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={property.thumbnail || "placeholder.jpg"}
              />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.address}</Card.Text>
                <Card.Text>
                  <strong>Price: </strong>${property.price}
                </Card.Text>
                <Link
                  to={`/properties/${property.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PropertyList;
