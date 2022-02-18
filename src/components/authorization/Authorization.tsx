import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizeHref } from '../../oauthConfig';
import { setAccessToken, setLoggedIn, setTokenExpiryDate } from '../../redux/session/session.actions';
import { selectIsLoggedIn, selectTokenExpiryDate } from '../../redux/session/session.selector';
import { getHashParams, removeHashParamsFromUrl } from '../../utils/hashUtils';
// import styles from '../counter/Counter.module.css';


const hashParams = getHashParams();
const access_token = hashParams.access_token;
const expires_in = hashParams.expires_in;
removeHashParamsFromUrl();

export function Authorization() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const tokenExpiryDate = useSelector(selectTokenExpiryDate);
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
      <div >
        {!isLoggedIn &&
          <button
          aria-label="Log in using OAuth 2.0"
          onClick={() => window.open(getAuthorizeHref(), '_self')}
          >
          Log in with Spotify
          </button>}
        {isLoggedIn && <div >Token expiry date: {tokenExpiryDate}</div>}
      </div>
    </div>
  );
}
