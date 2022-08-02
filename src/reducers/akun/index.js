/* eslint-disable import/no-anonymous-default-export */

import { GET_LIST_AKUN } from "../../actions/AkunAction";

const initialState = {
  getListAkunLoading: false,
  getListAkunResult: false,
  getListAkunError: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_AKUN:
      return {
        ...state,
        getListAkunLoading: action.payload.loading,
        getListAkunResult: action.payload.data,
        getListAkunError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
