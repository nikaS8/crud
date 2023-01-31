import { all } from "redux-saga/effects";
import {helloSaga, watchUsersAsync} from "./numSagas";

export function* rootSaga() {
    yield all([
        watchUsersAsync()
    ])
}