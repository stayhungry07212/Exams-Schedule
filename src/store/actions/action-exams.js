import * as actionTypes from "./actionTypes";
import * as database from "../../database-mockup";

export const setExams = (exams) => {
  return {
    type: actionTypes.SET_EXAMS,
    exams: exams,
  };
};

export const initExams = () => {
  return (dispatch) => {
    database.get().once(
      "value",
      (snap) => {
        let items = [];
        const myObj = snap.val();
        const keys = Object.keys(snap.val());
        keys.forEach((key) => {
          items.push({
            id: key,
            anUniversitar: myObj[key].anUniversitar,
            sesiune: myObj[key].sesiune,
            anStudiu: myObj[key].anStudiu,
            sectie: myObj[key].sectie,
            nrLocuri: myObj[key].nrLocuri,
            materie: myObj[key].materie,
            profesor: myObj[key].profesor,
            dataExamen: myObj[key].dataExamen,
          });
        });
        dispatch(setExams(items));
      },
      (error) => {
        console.log("Error: " + error.message);
      }
    );
  };
};

export const updateExam = (currentExam) => {
  database.saveEdits(currentExam);
  return {
    type: actionTypes.UPDATE_EXAM,
    updatedExam: currentExam,
  };
};

export const removeExam = (examId, callback) => {
  database.removeItem(examId)
  .then(res => {
    console.log(res);
    return callback(res);
  })
  .catch(err => {
    console.log(err);
    return callback(err);
  })
  return {
    type: actionTypes.REMOVE_EXAM,
    removedExamId: examId,
  };
};

export const addExam = (newExam) => {
  return (dispatch) => {
    database
    .saveNewItem(newExam)
    .then((res) => {
      newExam.id = res.key;
      dispatch( {
        type: actionTypes.ADD_EXAM,
        addedExam: newExam,
      });
    })
    .catch((err) => console.log(err));
  }
 
};
