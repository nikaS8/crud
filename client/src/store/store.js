import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import numReducer from './numSlice'
import codeReducer from "./phoneSlice";
import createSagaMiddleware from 'redux-saga'
import {rootSaga}  from '../sagas'

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    numbers: numReducer,
    code: codeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)