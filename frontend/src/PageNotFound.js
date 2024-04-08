import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page_not_found_div">
      <h1 className="text-danger">404 - Page Not Found</h1>
      <Link to="/login">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
