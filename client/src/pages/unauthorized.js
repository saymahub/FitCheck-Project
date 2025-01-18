import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Return to Landing</Link>
    </div>
  );
};

export default Unauthorized;
