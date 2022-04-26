import { all, takeLatest, call, put } from "redux-saga/effects";
import { decode } from "jsonwebtoken";
import api from "@/services/api";
import { signInSuccess, signFailure, signOut } from "./actions";

function* login({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, "/login", { email, password });

    if (response && response.data && response.data.token) {
      try {
        const validateToken = yield call(api.post, "/validate", {
          token: response.data.token,
        });

        const user = validateToken.data;

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        yield put(signInSuccess(response.data.token, user));
      } catch (error) {
        yield put(signFailure());
      }
    }
  } catch (error) {
    yield put(signFailure());
  }
}

function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    const { exp: tokenExpiration } = decode(token);
    if (tokenExpiration <= Math.floor(Date.now() / 1000))
      return yield put(signOut());

    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest("@auth/SIGN_IN_REQUEST", login),
  takeLatest("persist/REHYDRATE", setToken),
]);
