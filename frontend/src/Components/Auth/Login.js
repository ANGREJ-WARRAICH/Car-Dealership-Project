import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrorMessage({
        emailError: "Please Enter Email",
      });
      return;
    } else if (!formData.password) {
      setErrorMessage({
        passwordError: "Please Enter Password",
      });
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      if (response.status !== 200) {
        toast.error(response.data.message);
      }
      toast.success(response.data.message);
      const { token } = response.data;
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("type", response.data?.user?.type);
      Cookies.set("user_Id", response.data?.user?._id);
      setFormData({
        email: "",
        password: "",
      });
      setTimeout(() => {
        setIsLoading(false);
        navigation("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="image_bg">
      <Container
        className="d-flex justify-content-center align-items-center "
        style={{ minHeight: "100vh" }}
      >
        <div className="border border-2 rounded-4 set_responsive_width_for_auth">
          <Form onSubmit={handleSubmit}>
            <h1 className="text-center text-white mb-4">LogIn</h1>
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

            <Form.Group controlId="formBasicPassword" className="mb-4">
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

            <Button variant="primary" type="submit" className="w-100">
              {isLoading ? " Loading..." : "Login"}
            </Button>
            <div className="text-end my-3 text-primary">
              Go to <Link className="text-white" to="/">SignUp</Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
