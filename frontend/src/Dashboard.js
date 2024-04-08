import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button, Container, FormControl } from "react-bootstrap";
import AuthCheck from "./Components/AuthCheck/AuthCheck";
import EditCar from "./Components/Modals/EditCar";
import AllCars from "./Components/Table/AllCars";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
  const { auth, authToken } = props;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [carList, setCarList] = useState([]);

  const filteredData = carList.filter((item) => {
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (typeof value === "number") {
        return value.toString().includes(searchQuery);
      }
      return false;
    });
  });
  // console.log("carList==========>",carList);

  useEffect(() => {
    if (authToken) {
      fetchCarData();
    } else {
      navigate("/login");
    }
  }, [authToken]);

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
        const totalCars = responseOfCars.data.cars
        const filterData = response.data.cars.filter(
          (res) => res.userId[0]?._id === user_Id
        );

        // Extracting carId and carStatus into a new array
        const newArray = filterData.map((entry) => {
          return {
            carId: entry.carId[0]?._id,
            carStatus: entry.carStatus,
          };
        })

        totalCars.forEach((car) => {
          const matchingStatus = newArray.find(
            (status) => status?.carId === car?._id
          );
          if (matchingStatus) {
            car.carStatus = matchingStatus.carStatus;
          }
        });
        setCarList(totalCars);
      } catch (error) {
        console.error("Error fetching car data:::::::::", error);
      }

    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleEditModalClose = () => {
    fetchCarData();
    setShow(false);
  };

  return (
    <>
      <Container className="mainContainer">
        <div className="d-flex justify-content-between flex-column flex-lg-row my-4">
          <div className="w-100">
            <h3>Car List</h3>
          </div>
          <div className="w-100">
            <FormControl
              type="text"
              placeholder="Search Records"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 w-100 border border-black"
            />
          </div>
          {auth && (
            <div className="w-100 text-end">
              <Button
                className="mt-3 mt-lg-0 CarButton"
                onClick={() => setShow(true)}
              >
                Create Car
              </Button>
            </div>
          )}
        </div>
        <div className="my-3">
          <div className="row mb-2">
            <div className="col-12 col-md-6"></div>
            <div className="col-12 col-md-6"></div>
          </div>
          <AllCars data={filteredData} />
        </div>
        <EditCar
          showEditModal={show}
          handleEditModalClose={() => handleEditModalClose()}
        />
      </Container>
    </>
  );
};

export default AuthCheck({ Component: Dashboard });
