import {
  GET_LIST_CATHOODIE,
  GET_DETAIL_CATHOODIE,
  TAMBAH_CATHOODIE,
  UPDATE_CATHOODIE,
  DELETE_CATHOODIE,
} from "../../actions/CatHoodieAction";

const initialState = {
  getListCatHoodieLoading: false,
  getListCatHoodieResult: false,
  getListCatHoodieError: false,

  getDetailCatHoodieLoading: false,
  getDetailCatHoodieResult: false,
  getDetailCatHoodieError: false,

  tambahCatHoodieLoading: false,
  tambahCatHoodieResult: false,
  tambahCatHoodieError: false,

  updateCatHoodieLoading: false,
  updateCatHoodieResult: false,
  updateCatHoodieError: false,

  deleteCatHoodieLoading: false,
  deleteCatHoodieResult: false,
  deleteCatHoodieError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_CATHOODIE:
      return {
        ...state,
        getListCatHoodieLoading: action.payload.loading,
        getListCatHoodieResult: action.payload.data,
        getListCatHoodieError: action.payload.errorMessage,
      };
    case GET_DETAIL_CATHOODIE:
      return {
        ...state,
        getDetailCatHoodieLoading: action.payload.loading,
        getDetailCatHoodieResult: action.payload.data,
        getDetailCatHoodieError: action.payload.errorMessage,
      };
    case TAMBAH_CATHOODIE:
      return {
        ...state,
        tambahCatHoodieLoading: action.payload.loading,
        tambahCatHoodieResult: action.payload.data,
        tambahCatHoodieError: action.payload.errorMessage,
      };
    case UPDATE_CATHOODIE:
      return {
        ...state,
        updateCatHoodieLoading: action.payload.loading,
        updateCatHoodieResult: action.payload.data,
        updateCatHoodieError: action.payload.errorMessage,
      };
    case DELETE_CATHOODIE:
      return {
        ...state,
        deleteCatHoodieLoading: action.payload.loading,
        deleteCatHoodieResult: action.payload.data,
        deleteCatHoodieError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
