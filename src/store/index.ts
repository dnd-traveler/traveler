import { combineReducers } from 'redux';

import timeReducer from './time/time.slice';
import weatherReducer from './weather/weather.slice';
import playersReducer from './players/players.slice';
import initiativeReducer from './initiative/initiative.slice';
import jojoReducer from './jojo/jojo.slice';

const rootReducer = combineReducers({
    time: timeReducer,
    weather: weatherReducer,
    players: playersReducer,
    initiative: initiativeReducer,
    jojo: jojoReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;