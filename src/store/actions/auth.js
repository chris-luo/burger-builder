import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: idToken,
  userId: userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBTlcmZSw8KfAS1XlN14H9y4Jy-f7ITYt0';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBTlcmZSw8KfAS1XlN14H9y4Jy-f7ITYt0';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId))
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error))
      })
  };
}