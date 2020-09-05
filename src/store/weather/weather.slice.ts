import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TravelerWeatherType = 'clear' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'blizzard' | 'tornado';

export interface TravelerWeatherState {
    weatherType: TravelerWeatherType;
    temperature: number;
    windSpeed: number;
}

const initialState: TravelerWeatherState = {
    weatherType: 'clear',
    temperature: 70,
    windSpeed: 0
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeatherType(state, action: PayloadAction<TravelerWeatherType>) {
            state.weatherType = action.payload;
        },
        setTemperature(state, action: PayloadAction<number>) {
            state.temperature = action.payload;
        },
        setWindSpeed(state, action: PayloadAction<number>) {
            state.windSpeed = action.payload;
        }
    }
});

export const { setWeatherType, setTemperature, setWindSpeed } = weatherSlice.actions;
export default weatherSlice.reducer;