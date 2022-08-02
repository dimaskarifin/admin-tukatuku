/* eslint-disable import/no-anonymous-default-export */
import {
  GET_LIST_HOODIE,
  UPLOAD_HOODIE,
  TAMBAH_HOODIE,
  GET_DETAIL_HOODIE,
  UPDATE_HOODIE,
  DELETE_HOODIE,
} from "../../actions/HoodieAction";

const initialState = {
  getListHoodieLoading: false,
  getListHoodieResult: false,
  getListHoodieError: false,

  getDetailHoodieLoading: false,
  getDetailHoodieResult: false,
  getDetailHoodieError: false,

  uploadHoodieLoading: false,
  uploadHoodieResult: false,
  uploadHoodieError: false,

  tambahHoodieLoading: false,
  tambahHoodieResult: false,
  tambahHoodieError: false,

  updateHoodieLoading: false,
  updateHoodieResult: false,
  updateHoodieError: false,

  deleteHoodieLoading: false,
  deleteHoodieResult: false,
  deleteHoodieError: false,
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
    case GET_DETAIL_HOODIE:
      return {
        ...state,
        getDetailHoodieLoading: action.payload.loading,
        getDetailHoodieResult: action.payload.data,
        getDetailHoodieError: action.payload.errorMessage,
      };
    case UPLOAD_HOODIE:
      return {
        ...state,
        uploadHoodieLoading: action.payload.loading,
        uploadHoodieResult: action.payload.data,
        uploadHoodieError: action.payload.errorMessage,
      };
    case TAMBAH_HOODIE:
      return {
        ...state,
        tambahHoodieLoading: action.payload.loading,
        tambahHoodieResult: action.payload.data,
        tambahHoodieError: action.payload.errorMessage,
      };
    case UPDATE_HOODIE:
      return {
        ...state,
        updateHoodieLoading: action.payload.loading,
        updateHoodieResult: action.payload.data,
        updateHoodieError: action.payload.errorMessage,
      };
    case DELETE_HOODIE:
      return {
        ...state,
        deleteHoodieLoading: action.payload.loading,
        deleteHoodieResult: action.payload.data,
        deleteHoodieError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
