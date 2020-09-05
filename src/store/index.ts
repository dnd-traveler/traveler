import { combineReducers } from 'redux';

import timeReducer from './time/time.slice';
import weatherReducer from './weather/weather.slice';

const rootReducer = combineReducers({
    time: timeReducer,
    weather: weatherReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;