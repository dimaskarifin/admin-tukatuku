import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_HOODIE = "GET_LIST_HOODIE";
export const UPLOAD_HOODIE = "UPLOAD_HOODIE";
export const TAMBAH_HOODIE = "TAMBAH_HOODIE";
export const GET_DETAIL_HOODIE = "GET_DETAIL_HOODIE";
export const UPDATE_HOODIE = "UPDATE_HOODIE";

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

export const getDetailHoodie = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_HOODIE);

    FIREBASE.database()
      .ref("hoodies/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_HOODIE, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_HOODIE, error);
        alert(error);
      });
  };
};

export const uploadHoodie = (gambar, imageToDB) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPLOAD_HOODIE);

    //Upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("hoodie")
      .child(gambar.name)
      .put(gambar);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        dispatchError(dispatch, UPLOAD_HOODIE, error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const dataBaru = {
            image: downloadURL,
            imageToDB: imageToDB,
          };

          dispatchSuccess(dispatch, UPLOAD_HOODIE, dataBaru);
        });
      }
    );
  };
};

export const tambahHoodie = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_HOODIE);

    const dataBaru = {
      gambar: [data.imageToDB1, data.imageToDB2],
      nama: data.nama,
      deskripsi: data.deskripsi,
      cathoodies: data.cathoodies,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      ready: data.ready,
      stok: data.stok,
      ukuran: data.ukuranSelected,
    };

    FIREBASE.database()
      .ref("hoodies")
      .push(dataBaru)
      .then((response) => {
        dispatchSuccess(dispatch, TAMBAH_HOODIE, response);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_HOODIE, error);
        alert(error);
      });
  };
};

export const updateHoodie = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_HOODIE);

    const dataBaru = {
      gambar: [
        data.imageToDB1 ? data.imageToDB1 : data.imageLama1,
        data.imageToDB2 ? data.imageToDB2 : data.imageLama2,
      ],
      nama: data.nama,
      deskripsi: data.deskripsi,
      cathoodies: data.cathoodies,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      ready: data.ready,
      stok: data.stok,
      ukuran: data.ukuranSelected,
    };

    FIREBASE.database()
      .ref("hoodies/" + data.id)
      .update(dataBaru)
      .then((response) => {
        if (data.imageToDB1) {
          var desertRef = FIREBASE.storage().refFromURL(data.imageLama1);
          desertRef.delete().catch(function (error) {
            dispatchError(dispatch, UPDATE_HOODIE, error);
          });
        }

        if (data.imageToDB2) {
          var desertRef2 = FIREBASE.storage().refFromURL(data.imageLama2);
          desertRef2.delete().catch(function (error) {
            dispatchError(dispatch, UPDATE_HOODIE, error);
          });
        }

        console.log("");
        dispatchSuccess(dispatch, UPDATE_HOODIE, "Update Hoodie Sukses");
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_HOODIE, error);
        alert(error);
      });
  };
};
