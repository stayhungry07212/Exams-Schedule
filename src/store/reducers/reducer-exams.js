import * as actionTypes from '../actions/actionTypes';

const initialState = {
  exams: null,
  user: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EXAMS: return {
      ...state,
      exams: action.exams
    };
    case actionTypes.UPDATE_EXAM:
      return {
        ...state,
        exams: [...state.exams.map(item => (item.id === action.updatedExam.id) ? action.updatedExam : item)]
      };
      case actionTypes.LOGIN: {
        return {
          ...state,
          user: action.user
        };
      }
    case actionTypes.REMOVE_EXAM:
      return {
        ...state,
        exams: [...state.exams.filter(item =>  item.id !== action.removedExamId)]
      };
      case actionTypes.ADD_EXAM:
      return {
        ...state,
        exams: [...state.exams, action.addedExam]
      };
    default:
      return state;
  }
};

export default reducer;

