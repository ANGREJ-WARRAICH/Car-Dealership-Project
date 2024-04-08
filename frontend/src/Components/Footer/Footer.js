import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import locationImg from "../../assets/images/location.jpg";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const Footer = () => {
  const defaultCenter = {
    lat: 45.4215, // Latitude of Ottawa
    lng: -75.6972, // Longitude of Ottawa
  };

  const defaultZoom = 5; // Zoom level for the map

  const Marker = ({ text }) => <div>{text}</div>;
  return (
    <div>
      <Container fluid className="CarButton mt-5">
        <Container>
          <Row className="p-3">
            <Col md={4}>
              <div>
                <h5>Contact Us</h5>
                <p>320 Queen St E, Brampton, Ontario, L6V 1C2</p>
                <p>Local 1-905-451-2030</p>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <h5>Business Hours</h5>
                <div className="d-flex justify-content-between">
                  <p>Mon.</p>
                  <p className="pe-0 pe-md-4">9:00AM - 7:00PM</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Tues.</p>
                  <p className="pe-0 pe-md-4">9:00AM - 7:00PM</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Wed.</p>
                  <p className="pe-0 pe-md-4">9:00AM - 7:00PM</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Thurs.</p>
                  <p className="pe-0 pe-md-4">9:00AM - 7:00PM</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Fri.</p>
                  <p className="pe-0 pe-md-4">9:00AM - 6:00PM</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Sat.</p>
                  <p className="pe-0 pe-md-4">9:00AM - 6:00PM</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Sun.</p>
                  <p className="pe-0 pe-md-4">Closed</p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div style={{ height: "100%", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "" }}
                  defaultCenter={defaultCenter }
                  defaultZoom={defaultZoom }
                >
                  <Marker
                    lat={defaultCenter.lat}
                    lng={defaultCenter.lng}
                    text="Ottawa, Canada"
                  />
                </GoogleMapReact>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Footer;
