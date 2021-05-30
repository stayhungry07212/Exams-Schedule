import * as actionTypes from "./actionTypes";
import * as firebase from "firebase";

export const updateCurrentUser = (currentUserUID) => {
    return {
      type: actionTypes.LOGIN,
      user: currentUserUID,
    };
  }

  export const initUser = ()  => {
    return (dispatch) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(updateCurrentUser(user.uid))
          firebase.database().ref(`Users/${user.uid}`).on(
            "value",
            (snap) => {
              let details = snap.val();
              details.uid = user.uid;
              dispatch(updateCurrentUser(details))
            })
        }
      })
    }
  }

  export const logOut = () => {
    return {
      type: actionTypes.LOGIN,
      user: null
    }
  }