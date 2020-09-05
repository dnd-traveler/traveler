import { TravelerWeatherState, TravelerWeatherType } from '../store/weather/weather.slice';
import * as Chance from 'chance';
import { useCallback } from 'react';
import { TravelerTime } from '../store/time/time.slice';

type WeightedWeather = {
    [key in TravelerWeatherType]: number;
}

const springWeightedWeather: WeightedWeather = {
    clear: 36,
    cloudy: 14,
    rain: 7,
    storm: 2,
    snow: 0,
    blizzard: 0,
    tornado: 1
}

const summerWeightedWeather: WeightedWeather = {
    clear: 44,
    cloudy: 8,
    rain: 3,
    storm: 3,
    snow: 0,
    blizzard: 0,
    tornado: 2
}

const fallWeightedWeather: WeightedWeather = {
    clear: 44,
    cloudy: 11,
    rain: 4,
    storm: 1,
    snow: 0,
    blizzard: 0,
    tornado: 0
}

const winterWeightedWeather: WeightedWeather = {
    clear: 36,
    cloudy: 14,
    rain: 2,
    storm: 1,
    snow: 6,
    blizzard: 1,
    tornado: 0
}

const chance = new Chance.Chance();

export function useWeather() {
    const getWeightedWeather = useCallback((weightedWeather: WeightedWeather): TravelerWeatherType => {
        return chance.weighted(
            Object.keys(weightedWeather),
            Object.values(weightedWeather)) as TravelerWeatherType;
    }, []);

    const generateVariance = useCallback((average: number, variance: number): number => {
        return Math.floor(average + (Math.random() * variance) * (Math.random() > 0.5 ? -1 : 1));
    }, []);

    const generateWeather = useCallback((time: TravelerTime): TravelerWeatherState => {
        switch (time.season) {
            case 'spring':
                return {
                    weatherType: getWeightedWeather(springWeightedWeather),
                    temperature: generateVariance(65, 20),
                    windSpeed: generateVariance(12, 6)
                };
            case 'summer':
                return {
                    weatherType: getWeightedWeather(summerWeightedWeather),
                    temperature: generateVariance(80, 15),
                    windSpeed: generateVariance(8, 4)
                };
            case 'fall':
                return {
                    weatherType: getWeightedWeather(fallWeightedWeather),
                    temperature: generateVariance(60, 20),
                    windSpeed: generateVariance(10, 5)
                };
            case 'winter':
                const weather = getWeightedWeather(winterWeightedWeather);
                const temperature = weather === 'snow' || weather === 'blizzard' ?
                    Math.min(32, generateVariance(40, 20)) :
                    generateVariance(40, 20);

                return {
                    weatherType: weather,
                    temperature: temperature,
                    windSpeed: generateVariance(10, 5)
                }
        }
    }, [generateVariance, getWeightedWeather]);

    return {
        generateWeather
    }
}