import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const CarRequest = () => {
  const [carData, setCarData] = useState([]);

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:8000/CarStatus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setCarData(response.data.cars);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      let token = Cookies.get("token");
      const data = {
        carStatus: "Sold",
      };
      const response = await axios.put(`http://localhost:8000/carStatus/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response?.data?.success) fetchData();
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      let token = Cookies.get("token");
      const data = {
        carStatus: "Rejected",
      };
      const response = await axios.put(`http://localhost:8000/carStatus/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response?.data?.success) fetchData();
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  console.log("carData",carData);

  return (
    <>
      <Container className="mainContainer">
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
                <th className="text-center">Sales Person</th>
                <th className="text-center action_table_field">Action</th>
              </tr>
            </thead>
            <tbody>
              {carData.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-center align-content-center">
                    {index + 1}
                  </td>
                  <td style={{ width: "150px", textAlign:"center" }}>
                    {item?.carId[0]?.photo ?  <Image
                      src={`http://localhost:8000/${item?.carId[0]?.photo}`}
                      width={150}
                      height={80}
                    /> : "not found"}
                  </td>
                  <td className="text-center align-content-center">
                    {item?.carId[0]?.make || "not found"}
                  </td>
                  <td className="text-center align-content-center">
                    {item?.carId[0]?.model || "not found"}
                  </td>
                  <td className="text-center align-content-center">
                    {item?.carId[0]?.year || "not found"}
                  </td>
                  <td className="text-center align-content-center">
                    {item?.carId[0]?.price || "not found"}
                  </td>
                  <td className="text-center align-content-center">
                    {item?.userId[0]?.name || "not found"}
                  </td>
                  <td className="text-center align-content-center">
                    {item?.carStatus === "Sold" ? (
                      <h5 className="text-success">Approved</h5>
                    ) : item?.carStatus === "Rejected" ? (
                      <h5 className="text-danger">Rejected</h5>
                    ) : (
                      <>
                        <Button
                          className="btn btn-primary me-0 me-md-3 mb-2 mb-lg-0"
                          onClick={() => handleApprove(item?._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          className="btn btn-danger"
                          onClick={() =>
                            handleReject(item?._id,)
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {carData.length === 0 && (
            <h5 className="text-center">result not found</h5>
          )}
        </div>
      </Container>
    </>
  );
};

export default CarRequest;
