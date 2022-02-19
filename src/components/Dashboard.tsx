import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsValidSession } from "redux/session/session.selector";
import Navbar from "./navbar/Navbar";
import SearchForm from "./search/SearchForm";

const search = (term: string) => {
  console.log('Search triggered')
};

const Dashboard = () => {
  const isValidSession = useSelector(selectIsValidSession);

  return (
    <React.Fragment>
      {isValidSession ? (
        <div>
          <Navbar />
          <SearchForm searchFn={search} />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
