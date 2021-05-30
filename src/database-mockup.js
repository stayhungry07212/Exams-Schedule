import * as firebase from "firebase";
import * as moment from "moment";

export function get() {
  return firebase.database().ref("exams/");
}

export function saveNewItem(data) {
  return firebase
    .database()
    .ref("exams/")
    .push({
      anUniversitar: data.anUniversitar,
      sesiune: data.sesiune,
      anStudiu: data.anStudiu,
      sectie: data.sectie,
      nrLocuri: data.nrLocuri,
      materie: data.materie,
      profesor: data.profesor,
      dataExamen: data.dataExamen
        ? data.dataExamen
        : moment().format("YYYY-MM-DD"),
    });
}

export function saveEdits(data) {
  return firebase
    .database()
    .ref("exams/" + data.id)
    .update({
      anUniversitar: data.anUniversitar,
      sesiune: data.sesiune,
      anStudiu: data.anStudiu,
      sectie: data.sectie,
      nrLocuri: data.nrLocuri,
      materie: data.materie,
      profesor: data.profesor,
      dataExamen: data.dataExamen,
    });
}

export function removeItem(id) {
  return firebase
    .database()
    .ref("exams/" + id)
    .remove();
}

export function signin(loginInformations) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(
      loginInformations.email,
      loginInformations.password
    );
}

export function signout() {
  return firebase.auth().signOut();
}

export const getUserByID = (userID) => {
  firebase.database().ref(`Users/${userID}`)
}
