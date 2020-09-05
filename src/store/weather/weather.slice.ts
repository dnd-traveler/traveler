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
        setWeather(state, action: PayloadAction<TravelerWeatherState>) {
            state.weatherType = action.payload.weatherType;
            state.temperature = action.payload.temperature;
            state.windSpeed = action.payload.windSpeed;
        },
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

export const { setWeather, setWeatherType, setTemperature, setWindSpeed } = weatherSlice.actions;
export default weatherSlice.reducer;