import React, { useCallback, useEffect } from 'react';
import { useWeather } from '../../util/use-weather';
import { setWeather } from '../../store/weather/weather.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button, Typography } from 'antd';
import { capitalize } from '../../util/utilities';
import { TravelerTime } from '../../store/time/time.slice';

const TravelerWeather = () => {
    const dispatch = useDispatch();
    const time = useSelector((state: RootState) => state.time);
    const weather = useSelector((state: RootState) => state.weather);
    const { generateWeather } = useWeather();

    const forceGenerate = useCallback((time: TravelerTime) => {
        const generatedWeather = generateWeather(time);
        dispatch(setWeather(generatedWeather));
    }, [generateWeather, dispatch]);

    const forceGenerateHandler = useCallback(() => {
        forceGenerate(time);
    }, [time, forceGenerate]);

    useEffect(() => {
        if ((time.hour % 6 === 0)) {
            forceGenerate(time);
        }
    }, [time, forceGenerate]);

    useEffect(() => {
    }, [time]);

    useEffect(() => {
    }, [forceGenerate]);

    return (
        <div>
            <Typography.Paragraph>
                <Typography.Text strong>Weather Conditions: </Typography.Text>
                <Typography.Text>{capitalize(weather.weatherType || '')}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong>Temperature: </Typography.Text>
                <Typography.Text>{weather.temperature}°F</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong>Wind Speed: </Typography.Text>
                <Typography.Text>{weather.windSpeed}mph</Typography.Text>
            </Typography.Paragraph>

            <Button type="primary" danger onClick={forceGenerateHandler}>Force Change</Button>
        </div>
    )
};

export default TravelerWeather;