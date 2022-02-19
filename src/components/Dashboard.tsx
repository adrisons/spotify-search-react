import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectAccessToken,
  selectIsValidSession,
} from "redux/session/session.selector";
import { spotifySearch } from "services/search/Search";
import Navbar from "./navbar/Navbar";
import SearchForm from "./search/SearchForm";

const Dashboard = () => {
  const isValidSession = useSelector(selectIsValidSession);
  const accessToken = useSelector(selectAccessToken);

  const search = async (term: string) => {
    const result = await spotifySearch(term, accessToken!);
    if (!result) {
      // display error
    } else {
      const { tracks, albums, artist } = result;
    }
  };

  return (
    <React.Fragment>
      {isValidSession ? (
        <div>
          <Navbar />
          <SearchForm searchFn={(term) => search(term)} />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
