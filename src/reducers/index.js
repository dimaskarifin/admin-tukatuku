import { combineReducers } from "redux";
import CatHoodieReducer from "./cathoodie";
import AuthReducer from "./auth";
import HoodieReducer from "./hoodie";
import PesananReducer from "./pesanan";
import AkunReducer from "./akun";

export default combineReducers({
  CatHoodieReducer,
  AuthReducer,
  HoodieReducer,
  PesananReducer,
  AkunReducer,
});
