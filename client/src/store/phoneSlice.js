import {createSlice} from "@reduxjs/toolkit";

const initialState = {value: '+7'}

const phoneSlice = createSlice({
    name: 'phone',
    initialState,
    reducers: {
        codePrinted(state, action) {
            state.value = action.payload.value
        }
    }
})

export const { codePrinted } = phoneSlice.actions
export default phoneSlice.reducer
