import { createSlice } from '@reduxjs/toolkit';

export interface JoJoState {
    active: boolean;
}

const initialState: JoJoState = {
    active: false
};

const jojoSlice = createSlice({
    name: 'jojo',
    initialState,
    reducers: {
        activate(state) {
            state.active = true;
        },
        deactivate(state) {
            state.active = false;
        }
    }
});

export const { activate, deactivate } = jojoSlice.actions;
export default jojoSlice.reducer;
