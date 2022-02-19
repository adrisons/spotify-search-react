import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsValidSession } from "redux/session/session.selector";
import { Authorization } from "../Authorization";
import "./LoginPage.scss";

const LoginPage = () => {
  const isValidSession = useSelector(selectIsValidSession);

  return (
    <React.Fragment>
      {isValidSession ? (
        <Navigate to="/" />
      ) : (
        <div className="login">
          <Authorization />
        </div>
      )}
    </React.Fragment>
  );
};

export default LoginPage;
