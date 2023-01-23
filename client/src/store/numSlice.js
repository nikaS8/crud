import { createSlice } from '@reduxjs/toolkit'

const initialState = {content: []} //content: [{ id: '', number: '' }]

const numSlice = createSlice({
    name: 'numbers',
    initialState,
    reducers: {
        initList(state = initialState, action) {
            state.content = action.payload
        },
        numAdded(state, action) {
            // const { id, content } = action.payload
            state.content.push(action.payload)

        },
        numDelete(state, action) {
            state.content = state.content.filter((el) => el.id !== action.payload)
        }
    }
})


export const { numAdded, initList, numDelete } = numSlice.actions

export default numSlice.reducer