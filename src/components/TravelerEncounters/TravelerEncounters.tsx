import React, { useCallback } from 'react';

import { Encounter, useEncounters } from '../../util/use-encounters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { Button, Select, Space, Tooltip, Typography, Tabs } from 'antd';
import dice from 'dice.js';
import Chance from 'chance';
import MonsterCard from '../MonsterCard/MonsterCard';
import { formatName } from '../../util/utilities';

const chance = new Chance.Chance();

const TravelerEncounters = () => {
    const time = useSelector((state: RootState) => state.time);
    const { generateEncounter, generateNightEncounter, forceEncounter, forceHostileEncounter, forceNeutralEncounter, forceFeatureEncounter } = useEncounters();

    const [currentEncounter, setCurrentEncounter] = useState<Encounter>();
    const [oldTime, setOldTime] = useState<number>();
    const [forceEncounterType, setForceEncounterType] = useState('random');

    useEffect(() => {
        if (oldTime !== time.hour) {
            if (time.hour < 6 || time.hour > 20) {
                setCurrentEncounter(generateNightEncounter());
            } else {
                setCurrentEncounter(generateEncounter());
            }

            setOldTime(time.hour);
        }
    }, [time, oldTime, generateEncounter, generateNightEncounter]);

    const parsedEncounter = useCallback(() => {
        if (!currentEncounter) {
            return null;
        }

        const encounterStrArray = currentEncounter.text.split(' ');
        const encounterJsx = encounterStrArray.map(word => {
            const regex = /(\d+)?d(\d+)([+-]\d+)?/ig;

            if (regex.test(word)) {
                return (
                    <span key={chance.guid()}>
                        <Tooltip title={'Roll: ' + dice.roll(word.toLowerCase()).toString()}>
                            <Typography.Text mark>{word}</Typography.Text>
                        </Tooltip>
                        {' '}
                    </span>
                );
            } else {
                return <Typography.Text key={chance.guid()}>{word + ' '}</Typography.Text>;
            }
        });

        return (
            <Typography.Paragraph>{encounterJsx}</Typography.Paragraph>
        )
    }, [currentEncounter]);

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
            <Typography.Paragraph>{parsedEncounter()}</Typography.Paragraph>

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

            <Tabs defaultActiveKey="1">
                {currentEncounter && currentEncounter.metadata.monsters.map((monster, i) => (
                    <Tabs.TabPane tab={formatName(monster)} tabKey={i.toString()} key={i}>
                        <MonsterCard monster={monster} />
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default TravelerEncounters;