import React from "react";
import { FaSearch } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsValidSession } from "redux/session/session.selector";
import Navbar from "./navbar/Navbar";


const Dashboard = () => {
  const isValidSession = useSelector(selectIsValidSession);

  return (
    <React.Fragment>
      {isValidSession ? (
        <div>
          <Navbar />
          <h1>Dashboard</h1>
          <FaSearch/>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
