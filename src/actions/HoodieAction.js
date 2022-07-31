import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_HOODIE = "GET_LIST_HOODIE";

export const getListHoodie = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_HOODIE);

    FIREBASE.database()
      .ref("hoodies")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_HOODIE, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_HOODIE, error);
        alert(error);
      });
  };
};
