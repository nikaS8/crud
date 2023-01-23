import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', content: '1234' },
    { id: '2', content: '6789' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload)
        }
    }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer