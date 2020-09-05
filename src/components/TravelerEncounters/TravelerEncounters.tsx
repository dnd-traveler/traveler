import React, { useCallback } from 'react';

import { useEncounters } from '../../util/use-encounters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { Button, Select, Space, Typography } from 'antd';

const TravelerEncounters = () => {
    const time = useSelector((state: RootState) => state.time);
    const { generateEncounter, generateNightEncounter, forceEncounter, forceHostileEncounter, forceNeutralEncounter, forceFeatureEncounter } = useEncounters();

    const [currentEncounter, setCurrentEncounter] = useState<string>();
    const [oldTime, setOldTime] = useState<number>();
    const [forceEncounterType, setForceEncounterType] = useState('random');

    useEffect(() => {
        if (oldTime !== time.hour) {
            if (time.hour < 7 || time.hour > 22) {
                setCurrentEncounter(generateNightEncounter());
            } else {
                setCurrentEncounter(generateEncounter());
            }

            setOldTime(time.hour);
        }
    }, [time, oldTime, generateEncounter, generateNightEncounter]);

    const setEncounter = useCallback(() => {
        switch (forceEncounterType) {
            case 'random':
                setCurrentEncounter(forceEncounter());
                break;
            case 'hostile':
                setCurrentEncounter(forceHostileEncounter());
                break;
            case 'neutral':
                setCurrentEncounter(forceNeutralEncounter());
                break;
            case 'feature':
                setCurrentEncounter(forceFeatureEncounter());
                break;
        }
    }, [forceEncounter, forceHostileEncounter, forceNeutralEncounter, forceFeatureEncounter, forceEncounterType]);

    const forceEncounterChangeHandler = useCallback((value: string) => {
        setForceEncounterType(value);
    }, []);

    return (
        <div>
            <Typography.Paragraph>{currentEncounter}</Typography.Paragraph>

            <Space>
                <Select
                    defaultValue="random"
                    onChange={forceEncounterChangeHandler}
                >
                    <Select.Option value="random">Random</Select.Option>
                    <Select.Option value="hostile">Hostile</Select.Option>
                    <Select.Option value="neutral">Neutral</Select.Option>
                    <Select.Option value="feature">Feature</Select.Option>
                </Select>

                <Button type="primary" danger onClick={setEncounter}>Force Encounter</Button>
            </Space>
        </div>
    );
};

export default TravelerEncounters;