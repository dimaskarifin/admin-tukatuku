import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_AKUN = "GET_LIST_AKUN";

export const getListAkun = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_AKUN);

    FIREBASE.database()
      .ref("users")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        console.log("Data: ", data);
        dispatchSuccess(dispatch, GET_LIST_AKUN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_AKUN, error);
        alert(error);
      });
  };
};
