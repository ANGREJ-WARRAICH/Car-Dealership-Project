import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setErrorMessage({ nameError: "Please Enter Name" });
      return;
    } else if (!formData.email) {
      setErrorMessage({ emailError: "Please Enter Email" });
      return;
    } else if (!formData.password) {
      setErrorMessage({ passwordError: "Please Enter Password" });
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formData
      );
      if (response.status !== 200) {
        throw new Error("Registration failed");
      }
      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        setIsLoading(false);
        navigation("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="image_bg">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="border border-2 rounded-4 set_responsive_width_for_auth">
          <Form onSubmit={handleSubmit}>
            <h1 className="text-center text-white mb-4">Register</h1>
            <Form.Group controlId="formBasicName" className="">
              <Form.Label className="fw-bold text-white">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <span className="text-danger">
                {errorMessage.nameError ? errorMessage.nameError : ""}
              </span>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="my-3">
              <Form.Label className="fw-bold text-white">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <span className="text-danger">
                {errorMessage.emailError ? errorMessage.emailError : ""}
              </span>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="fw-bold text-white">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
              <span className="text-danger">
                {errorMessage.passwordError ? errorMessage.passwordError : ""}
              </span>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 fs-5 mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </Form>
          <div className="text-end text-primary my-3">
            Go to <Link className="text-white" to="/login">LogIn</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
