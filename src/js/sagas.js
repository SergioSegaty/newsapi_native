import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { NewsAPI } from "./NewsAPI";

const newsAPI = new NewsAPI();

function* fetchDefault(action) {
  try {
    const newsList = yield call(newsAPI.getTop);
    yield put({ type: "fetch/success", items: newsList });
  } catch (e) {
    yield put({ type: "fetch/failed", message: e.message });
  }
}

function* fetchTop(action) {
  try {
    const newsList = yield call(newsAPI.getTop, action.query);
    yield put({ type: "fetch/success", items: newsList });
  } catch (e) {
    yield put({ type: "fetch/error", message: e.message });
  }
}

function* fecthAll(action) {
  try {
    const newsList = yield call(newsAPI.getAll(action.query), action.items);
    yield put({ type: "fetch/success", items: newsList });
  } catch (e) {
    yield put({ type: "fetch/error", message: e.message });
  }
}

function* mySaga() {
  yield takeLatest("update/default", fetchDefault);
  yield takeLatest("update/top", fetchTop);
  yield takeLatest("update/all", fecthAll);
}

export default mySaga;
