import { all } from "redux-saga/effects";
import { watchUsersAsync} from "./numSagas";

export function* rootSaga() {
    yield all([
        watchUsersAsync()
    ])
}