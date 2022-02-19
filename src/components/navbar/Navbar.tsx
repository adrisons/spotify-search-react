import spotifyLogo from "assets/spotify-logo.png";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "redux/session/session.actions";
import "./Navbar.scss";
const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="navbar__title">
        <img className="navbar__title-logo" src={spotifyLogo} alt="Logo" />
        <span className="navbar__title-name">Spotify Music Search</span>
      </div>

      <button className="navbar__action" onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Navbar;
