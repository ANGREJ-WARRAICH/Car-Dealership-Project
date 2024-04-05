import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const EditCar = (props) => {
  const { showEditModal, editId, handleEditModalClose, edititem } = props;
  const [photoFile, setsetPhotoFile] = useState(null);

  const [errorMessage, setErrorMessage] = useState({
    makeError: "",
    modelError: "",
    yearError: "",
    colorError: "",
    priceError: "",
    photoError: "",
    mileageError: "",
    fuelTypeError: "",
    transmissionError: "",
    engineSizeError: "",
    vinError: "",
  });
  const [carInfo, setCarInfo] = useState({
    make: "",
    model: "",
    year: 0,
    color: "",
    price: 0,
    photo: "",
    mileage: 0,
    fuelType: "",
    transmission: "",
    engineSize: 0,
    vin: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  
  useEffect(() => {
    if (editId) {
      setCarInfo({
        make: edititem?.make,
        model: edititem?.model,
        year: edititem?.year,
        color: edititem?.color,
        price: edititem?.price,
        mileage: edititem?.mileage,
        fuelType: edititem?.fuelType,
        transmission: edititem?.transmission,
        engineSize: edititem?.engineSize,
        vin: edititem?.vin,
      });
      setImagePreview(`http://localhost:8000/${edititem?.photo}`);
    }
  }, [editId]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carInfo.make) {
      setErrorMessage({
        makeError: "Enter make name",
      });
    } else if (!carInfo.model) {
      setErrorMessage({
        modelError: "Enter model name",
      });
    } else if (!carInfo.year) {
      setErrorMessage({
        yearError: "Enter year",
      });
    } else if (!carInfo.price) {
      setErrorMessage({
        priceError: "Enter price",
      });
    } else if (!carInfo.color) {
      setErrorMessage({
        colorError: "Enter color name",
      });
    } else if (!carInfo.vin) {
      setErrorMessage({
        vinError: "Enter number Of Doors",
      });
    } else if (!carInfo.engineSize) {
      setErrorMessage({
        engineSizeError: "Enter engine size",
      });
    } else if (!carInfo.mileage) {
      setErrorMessage({
        mileageError: "Enter mileage",
      });
    } else if (!carInfo.fuelType) {
      setErrorMessage({
        fuelTypeError: "select fuelType",
      });
    } else if (!carInfo.transmission) {
      setErrorMessage({
        transmissionError: "Select transmission",
      });
    } else if (!imagePreview) {
      setErrorMessage({
        photoError: "Select Image",
      });
    } else {
      const formData = new FormData();
      formData.append("make", carInfo.make);
      formData.append("model", carInfo.model);
      formData.append("year", carInfo.year);
      formData.append("color", carInfo.color);
      formData.append("price", carInfo.price);
      formData.append("mileage", carInfo.mileage);
      formData.append("fuelType", carInfo.fuelType);
      formData.append("transmission", carInfo.transmission);
      formData.append("engineSize", carInfo.engineSize);
      formData.append("vin", carInfo.vin);
      formData.append("carStatus", "");
      formData.append("file", photoFile);

      try {
        let token = Cookies.get("token");
        if (editId) {
          const response = await axios.put(
            `http://localhost:8000/car/${editId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setErrorMessage("");
          toast.success(response.data.message);
          handleEditModalClose();
        } else {
          const response = await axios.post(
            "http://localhost:8000/car",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setErrorMessage("");
          toast.success(response.data.message);
          handleEditModalClose();
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setsetPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCarInfo({ ...carInfo, photo: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Modal
        size="lg"
        show={showEditModal}
        onHide={() => {
          setErrorMessage("");
          setCarInfo("");
          handleEditModalClose();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Update Car" : "Create Car"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Make</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter make name"
                      value={carInfo?.make ? carInfo?.make : ""}
                      onChange={(e) =>
                        setCarInfo({ ...carInfo, make: e.target.value })
                      }
                    />
                    <span className="text-danger">
                      {errorMessage.makeError ? errorMessage.makeError : ""}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter modal"
                      value={carInfo?.year ? carInfo?.year : ""}
                      onChange={(e) =>
                        setCarInfo({ ...carInfo, year: e.target.value })
                      }
                    />
                    <span className="text-danger">
                      {errorMessage.yearError ? errorMessage.yearError : ""}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter color"
                      value={carInfo?.color ? carInfo?.color : ""}
                      onChange={(e) =>
                        setCarInfo({ ...carInfo, color: e.target.value })
                      }
                    />
                    <span className="text-danger">
                      {errorMessage.colorError ? errorMessage.colorError : ""}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Engine (CC)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter engine CC"
                      value={carInfo?.engineSize ? carInfo?.engineSize : ""}
                      onChange={(e) =>
                        setCarInfo({ ...carInfo, engineSize: e.target.value })
                      }
                    />
                    <span className="text-danger">
                      {errorMessage.engineSizeError
                        ? errorMessage.engineSizeError
                        : ""}
                    </span>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter model name"
                      value={carInfo?.model ? carInfo?.model : ""}
                      onChange={(e) =>
                        setCarInfo({ ...carInfo, model: e.target.value })
                      }
                    />
                    <span className="text-danger">
                      {errorMessage.modelError ? errorMessage.modelError : ""}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={carInfo?.price ? carInfo?.price : ""}
                      onChange={(e) =>
                        setCarInfo({ ...carInfo, price: e.target.value })
                      }
                    />
                    <span className="text-danger">
                      {errorMessage.priceError ? errorMessage.priceError : ""}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>VIN</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter VIN number"
                      value={
                        carInfo?.vin ? carInfo?.vin : ""
                      }
                      onChange={(e) =>
                        setCarInfo({
                          ...carInfo,
                          vin: e.target.value,
                        })
                      }
                    />
                    <span className="text-danger">
                      {errorMessage.vinError
                        ? errorMessage.vinError
                        : ""}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mileage(kmpl)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter model price"
                      value={carInfo.mileage ? carInfo.mileage : ""}
                      onChange={(e) =>
                        setCarInfo({ ...carInfo, mileage: e.target.value })
                      }
                    />
                    <span className="text-danger">
                      {errorMessage.mileageError
                        ? errorMessage.mileageError
                        : ""}
                    </span>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} className="d-flex">
                  <DropdownButton
                    title={carInfo.fuelType ? carInfo.fuelType : "Fuel"}
                    className="mb-3"
                  >
                    <Dropdown.Item
                      onClick={() =>
                        setCarInfo({ ...carInfo, fuelType: "Petrol" })
                      }
                    >
                      Petrol
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setCarInfo({ ...carInfo, fuelType: "Diesel" })
                      }
                    >
                      Diesel
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setCarInfo({ ...carInfo, fuelType: "Electric" })
                      }
                    >
                      Electric
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setCarInfo({ ...carInfo, fuelType: "Hybrid" })
                      }
                    >
                      Hybrid
                    </Dropdown.Item>
                  </DropdownButton>
                  <span className="text-danger ms-1">
                    {errorMessage.fuelTypeError
                      ? errorMessage.fuelTypeError
                      : ""}
                  </span>
                </Col>
                <Col xs={6}>
                  <DropdownButton
                    title={
                      carInfo.transmission
                        ? carInfo.transmission
                        : "Transmission"
                    }
                  >
                    <Dropdown.Item
                      onClick={() =>
                        setCarInfo({ ...carInfo, transmission: "Manual" })
                      }
                    >
                      Manual
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setCarInfo({ ...carInfo, transmission: "Automatic" })
                      }
                    >
                      Automatic
                    </Dropdown.Item>
                  </DropdownButton>
                  <span className="text-danger">
                    {errorMessage.transmissionError
                      ? errorMessage.transmissionError
                      : ""}
                  </span>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <span className="text-danger">
                      {errorMessage.photoError ? errorMessage.photoError : ""}
                    </span>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ maxWidth: "100%", marginTop: "10px" }}
                        width={400}
                        height={300}
                      />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-end mt-4">
                <Button className="w-25 navbar_bg" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditCar;
