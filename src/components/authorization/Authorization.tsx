import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  setAccessToken,
  setLoggedIn,
  setTokenExpiryDate
} from "redux/session/session.actions";
import { selectIsValidSession } from "redux/session/session.selector";
import { getAuthorizeHref } from "../../oauthConfig";
import { getHashParams, removeHashParamsFromUrl } from "../../utils/hashUtils";
import './Authorization.scss';

const hashParams = getHashParams();
const access_token = hashParams.access_token;
const expires_in = hashParams.expires_in;
removeHashParamsFromUrl();

export function Authorization() {
  const isValidSession = useSelector(selectIsValidSession);
  const dispatch = useDispatch();

  useEffect(() => {
    if (access_token) {
      dispatch(setLoggedIn(true));
      dispatch(setAccessToken(access_token));
      dispatch(setTokenExpiryDate(Number(expires_in)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        {!isValidSession ? (
          <button
            className="login-btn"
            aria-label="Log in using OAuth 2.0"
            onClick={() => window.open(getAuthorizeHref(), "_self")}
          >
            Log in with Spotify
          </button>
        ) : (
          <Navigate to="/" />
        )}
      </div>
    </div>
  );
}
