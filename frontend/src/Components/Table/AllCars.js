import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteCar from "../Modals/DeleteCar";
import EditCar from "../Modals/EditCar";
import AuthCheck from "../AuthCheck/AuthCheck";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Button,
  Container,
  Image,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

const AllCars = (props) => {
  const { data, auth } = props;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [editId, setEditId] = useState();
  const [edititem, setEdititem] = useState({});
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    setCarList(data);
  }, [data]);

  // Edit modal close
  const handleEditModalClose = () => {
    setEditId("");
    fetchCarData();
    setShowEditModal(false);
  };

  // delete modal close
  const handleDeleteModalClose = () => {
    setDeleteId("");
    setShow(false);
  };

  // fetch car list

  const fetchCarData = async () => {
    try {
      const token = Cookies.get("token");
      const user_Id = Cookies.get("user_Id");
      const responseOfCars = await axios.get("http://localhost:8000/car", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      try {
        const response = await axios.get("http://localhost:8000/CarStatus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const totalCars = responseOfCars.data.cars;
        const filterData = response.data.cars.filter(
          (res) => res.userId[0]._id === user_Id
        );

        // Extracting carId and carStatus into a new array
        const newArray = filterData.map((entry) => {
          return {
            carId: entry.carId[0]._id,
            carStatus: entry.carStatus,
          };
        });

        totalCars.forEach((car) => {
          const matchingStatus = newArray.find(
            (status) => status.carId === car._id
          );
          if (matchingStatus) {
            car.carStatus = matchingStatus.carStatus;
          }
        });
        setCarList(totalCars);
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // delete car function
  const handleDeleteCar = async () => {
    setShow(false);
    if (deleteId) {
      const token = Cookies.get("token");
      try {
        const response = await axios.delete(
          `http://localhost:8000/car/${deleteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        toast.success(response.data.message);
        fetchCarData();
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  const handleBuy = async (id) => {
    try {
      setIsloading(true);
      let token = Cookies.get("token");
      const userId = Cookies.get("user_Id");
      const res = await axios.post(
        "http://localhost:8000/emailSend",
        { _id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setIsloading(false);
      const data = {
        userId,
        CarId: id,
        carStatus: "Pending",
      };
      const response = await axios.post(
        "http://localhost:8000/carStatus",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) fetchCarData();
    } catch (error) {
      setIsloading(false);
      toast.error(error.response.data.message || error.message);
    }
  };
  return (
    <>
      <Container>
        <div className="table-responsive mt-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">SR</th>
                <th className="text-center">Photo</th>
                <th className="text-center">Make</th>
                <th className="text-center">Model</th>
                <th className="text-center">Year</th>
                <th className="text-center">Price($)</th>
                <th className="text-center action_table_field">Action</th>
              </tr>
            </thead>
            <tbody>
              {carList.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-center align-content-center">
                    {index + 1}
                  </td>
                  <td style={{ width: "150px" }}>
                    <Image
                      src={`http://localhost:8000/${item.photo}`}
                      width={150}
                      height={100}
                    />
                  </td>
                  <td className="text-center align-content-center">
                    {item.make}
                  </td>
                  <td className="text-center align-content-center">
                    {item.model}
                  </td>
                  <td className="text-center align-content-center">
                    {item.year}
                  </td>
                  <td className="text-center align-content-center">
                    {item.price}
                  </td>
                  <td className="text-center align-content-center">
                    <>
                      <Button
                        className="btn btn-success btn-md me-2"
                        onClick={() => navigate(`/carDetails/${item._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        className="btn btn-secondary btn-md me-2 my-2 my-lg-0"
                        onClick={() => {
                          setShowEditModal(true);
                          setEditId(item._id);
                          setEdititem(item);
                        }}
                      >
                        Edit
                      </Button>
                      {auth && (
                        <>
                          <Button
                            className="btn btn-danger btn-md"
                            onClick={() => {
                              setShow(true);
                              setDeleteId(item._id);
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                      {!item.carStatus && !auth && (
                        <button
                          className="btn btn-info btn-md me-2"
                          onClick={() => handleBuy(item._id)}
                        >
                          {isloading ? (
                            <Spinner
                              animation="border"
                              variant="dark"
                              size="sm"
                            />
                          ) : (
                            "Buy"
                          )}
                        </button>
                      )}
                      {item.carStatus === "Pending" && (
                        <h5 className="mb-0 align-content-center text-warning mt-0 mt-md-2">
                          Approval Pending
                        </h5>
                      )}
                      {item.carStatus === "Sold" && (
                        <h5 className="mb-0 align-content-center text-success mt-0 mt-md-2">
                          Sold
                        </h5>
                      )}
                      {item.carStatus === "Rejected" && (
                        <h5 className="mb-0 align-content-center text-danger mt-0 mt-md-2">
                          Rejected
                        </h5>
                      )}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {carList.length === 0 && (
            <h5 className="text-center">Cars not found</h5>
          )}
        </div>
      </Container>
      <DeleteCar
        show={show}
        handleClose={() => handleDeleteModalClose()}
        handleConformDelete={() => handleDeleteCar()}
      />
      <EditCar
        showEditModal={showEditModal}
        editId={editId}
        edititem={edititem}
        handleEditModalClose={() => handleEditModalClose()}
      />
    </>
  );
};

export default AuthCheck({ Component: AllCars });
