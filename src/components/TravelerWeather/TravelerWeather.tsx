import React, { useCallback, useEffect, useState } from 'react';
import { useWeather } from '../../util/use-weather';
import { TravelerWeatherState } from '../../store/weather/weather.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button, Typography } from 'antd';
import { capitalize } from '../../util/utilities';

const TravelerWeather = () => {
    const time = useSelector((state: RootState) => state.time);
    const { generateWeather } = useWeather();

    const [currentWeather, setCurrentWeather] = useState<TravelerWeatherState>();
    const [oldTime, setOldTime] = useState<number>();

    const forceGenerate = useCallback(() => {
        setCurrentWeather(generateWeather(time));
    }, [generateWeather, time]);

    useEffect(() => {
        if (oldTime === undefined || (oldTime !== time.hour && time.hour % 6 === 0)) {
            forceGenerate();
            setOldTime(time.hour);
        }
    }, [time, forceGenerate, oldTime]);

    return (
        <div>
            <Typography.Paragraph>
                <Typography.Text strong>Weather Conditions: </Typography.Text>
                <Typography.Text>{capitalize(currentWeather?.weatherType || '')}</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong>Temperature: </Typography.Text>
                <Typography.Text>{currentWeather?.temperature}°F</Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong>Wind Speed: </Typography.Text>
                <Typography.Text>{currentWeather?.windSpeed}mph</Typography.Text>
            </Typography.Paragraph>

            <Button type="primary" danger onClick={forceGenerate}>Force Change</Button>
        </div>
    )
};

export default TravelerWeather;