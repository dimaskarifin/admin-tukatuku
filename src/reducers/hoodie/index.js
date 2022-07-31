import { GET_LIST_HOODIE } from "../../actions/HoodieAction";

const initialState = {
  getListHoodieLoading: false,
  getListHoodieResult: false,
  getListHoodieError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_HOODIE:
      return {
        ...state,
        getListHoodieLoading: action.payload.loading,
        getListHoodieResult: action.payload.data,
        getListHoodieError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
