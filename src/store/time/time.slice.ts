import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TravelerSeason = 'spring' | 'summer' | 'fall' | 'winter';

export interface TravelerTime {
    hour: number;
    day: number;
    season: TravelerSeason;
}

const initialState: TravelerTime = {
    hour: 7,
    day: 1,
    season: 'spring'
};

const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        setHour(state, action: PayloadAction<number>) {
            state.hour = action.payload;
        },
        incrementHour(state) {
            const hour = state.hour + 1;

            if (hour === 24) {
                state.hour = 0;
                state.day++;
            } else {
                state.hour++;
            }
        },
        setDay(state, action: PayloadAction<number>) {
            state.day = action.payload;
        },
        incrementDay(state) {
            state.day++;
        },
        setSeason(state, action: PayloadAction<TravelerSeason>) {
            state.season = action.payload;
        },
        incrementSeason(state) {
            switch (state.season) {
                case 'spring':
                    state.season = 'summer';
                    break;
                case 'summer':
                    state.season = 'fall';
                    break;
                case 'fall':
                    state.season = 'winter';
                    break;
                case 'winter':
                    state.season = 'spring';
                    break;
            }
        }
    }
});

export const { setHour, incrementHour, setDay, incrementDay, setSeason, incrementSeason } = timeSlice.actions;
export default timeSlice.reducer;