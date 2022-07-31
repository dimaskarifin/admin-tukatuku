import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_CATHOODIE = "GET_LIST_CATHOODIE";
export const TAMBAH_CATHOODIE = "TAMBAH_CATHOODIE";
export const GET_DETAIL_CATHOODIE = "GET_DETAIL_CATHOODIE";
export const UPDATE_CATHOODIE = "UPDATE_CATHOODIE";
export const DELETE_CATHOODIE = "DELETE_CATHOODIE";

export const getListCatHoodie = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_CATHOODIE);

    FIREBASE.database()
      .ref("cathoodies")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_CATHOODIE, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_CATHOODIE, error);
        alert(error);
      });
  };
};

export const getDetailCatHoodie = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_CATHOODIE);

    FIREBASE.database()
      .ref("cathoodies/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_CATHOODIE, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_CATHOODIE, error);
        alert(error);
      });
  };
};

export const tambahCatHoodie = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_CATHOODIE);

    //Upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("cathoodie")
      .child(data.imageToDB.name)
      .put(data.imageToDB);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const dataBaru = {
            catHoodie: data.catHoodie,
            image: downloadURL,
          };
          FIREBASE.database()
            .ref("cathoodies")
            .push(dataBaru)
            .then((response) => {
              dispatchSuccess(
                dispatch,
                TAMBAH_CATHOODIE,
                response ? response : []
              );
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_CATHOODIE, error);
              alert(error);
            });
        });
      }
    );
  };
};

export const updateCatHoodie = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_CATHOODIE);

    //cek apakah gambar diganti
    if (data.imageToDB) {
      //ambil file gambar lama dari firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.imageLama);
      //Hapus gambar lama dari firebase storage
      desertRef
        .delete()
        .then(function () {
          //upload gambar yang baru
          var uploadTask = FIREBASE.storage()
            .ref("cathoodie")
            .child(data.imageToDB.name)
            .put(data.imageToDB);

          uploadTask.on(
            "state_changed",
            function (snapshot) {
              console.log(snapshot);
            },
            function (error) {
              console.log(error);
            },
            function () {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  const dataBaru = {
                    catHoodie: data.catHoodie,
                    image: downloadURL,
                  };

                  FIREBASE.database()
                    .ref("cathoodies/" + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_CATHOODIE,
                        response ? response : []
                      );
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_CATHOODIE, error);
                      alert(error);
                    });
                });
            }
          );
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_CATHOODIE, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        catHoodie: data.catHoodie,
        image: data.image,
      };

      FIREBASE.database()
        .ref("cathoodies/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_CATHOODIE, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_CATHOODIE, error);
          alert(error);
        });
    }
  };
};

export const deleteCatHoodie = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_CATHOODIE);

    //hapus data gambar image dari storage

    //Hapus gambar dari storage
    var desertRef = FIREBASE.storage().refFromURL(image);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        //hapus juga data di realtime database
        FIREBASE.database()
          .ref("cathoodies/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(
              dispatch,
              DELETE_CATHOODIE,
              "Category Hoodie Berhasil Dihapus"
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_CATHOODIE, error);
            alert(error);
          });
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        dispatchError(dispatch, DELETE_CATHOODIE, error);
        alert(error);
      });
  };
};
