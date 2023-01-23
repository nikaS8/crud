import { configureStore } from '@reduxjs/toolkit';
import numReducer from './numSlice'
import codeReducer from "./phoneSlice";

export default configureStore({
  reducer: {
    numbers: numReducer,
    code: codeReducer,
  },
})
