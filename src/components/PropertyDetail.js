import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Container, Button } from "react-bootstrap";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    api.get(`/properties/${id}`).then((response) => setProperty(response.data));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      api.delete(`/properties/${id}`).then(() => navigate("/"));
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <Container className="my-4">
      <h1>{property.title}</h1>
      <p>
        <strong>Address:</strong> {property.address}
      </p>
      <p>
        <strong>Price:</strong> ${property.price}
      </p>
      <Button
        variant="warning"
        className="mr-2"
        onClick={() => navigate(`/edit-property/${id}`)}
      >
        Edit
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Container>
  );
}

export default PropertyDetail;
