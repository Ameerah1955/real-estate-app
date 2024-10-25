import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Form, Button, Container } from "react-bootstrap";

function PropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: "",
    address: "",
    price: "",
  });

  useEffect(() => {
    if (id) {
      api
        .get(`/properties/${id}`)
        .then((response) => setProperty(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? api.put(`/properties/${id}`, property)
      : api.post("/properties", property);
    request.then(() => navigate("/"));
  };

  return (
    <Container className="my-4">
      <h1>{id ? "Edit" : "Add New"} Property</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default PropertyForm;
