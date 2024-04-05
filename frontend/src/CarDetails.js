// Group members:

// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039


import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthCheck from "./Components/AuthCheck/AuthCheck";

const CarDetails = (props) => {
  const { id } = useParams();
  const { authToken } = props;
  const navigate = useNavigate();
  const [carInfo, setCarInfo] = useState({});

  useEffect(() => {
    if (authToken) {
      fetchCarDetails();
    } else {
      navigate("/login")
    }
  }, [id, authToken]);

  const fetchCarDetails = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`http://localhost:8000/car/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setCarInfo(response.data.car);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={6}>
            <Image
              className="d-block w-100"
              src={`http://localhost:8000/${carInfo.photo}`}
              alt={`car photos`}
            />
          </Col>
          <Col lg={6} className="mt-4 mt-md-0">
            <Card className="shadow h-100">
              <Card.Body>
                <Row>
                  <Col xs={12} sm={6}>
                    <p>
                      <strong>Make:</strong> {carInfo.make}
                    </p>
                    <p>
                      <strong>Year:</strong> {carInfo.year}
                    </p>
                    <p>
                      <strong>Price:</strong> ${carInfo.price}
                    </p>
                    <p>
                      <strong>Color:</strong> {carInfo.color}
                    </p>
                    <p>
                      <strong>Fuel:</strong> {carInfo.fuelType}
                    </p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>
                      <strong>Model :</strong> {carInfo.model}
                    </p>
                    <p>
                      <strong>Engine(cc) :</strong> {carInfo.engineSize}
                    </p>
                    <p>
                      <strong>Transmission:</strong> {carInfo.transmission}
                    </p>
                    <p>
                      <strong>Mileage:</strong> {carInfo.mileage} kmpl
                    </p>
                    <p>
                      <strong>VIN:</strong> {carInfo.vin}
                    </p>
                  </Col>
                </Row>
                <div className="text-center mt-4"></div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthCheck({ Component: CarDetails });
