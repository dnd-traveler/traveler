import React, { useCallback } from 'react';

import { Encounter, GeneratorDie, nothingEvent, useEncounters } from '../../util/use-encounters';
import { useEffect, useState } from 'react';
import { Button, Select, Space, Tooltip, Typography, Tabs } from 'antd';
import dice from 'dice.js';
import Chance from 'chance';
import MonsterCard from '../MonsterCard/MonsterCard';
import { formatName } from '../../util/utilities';
import { subscribe } from 'redux-subscriber';

const chance = new Chance.Chance();

const TravelerEncounters = () => {
    const { generateEncounter, generateNightEncounter, forceEncounter, forceHostileEncounter, forceNeutralEncounter, forceFeatureEncounter } = useEncounters();

    const [currentEncounter, setCurrentEncounter] = useState<Encounter>(nothingEvent);
    const [forceEncounterType, setForceEncounterType] = useState('random');
    const [generatorDie, setGeneratorDie] = useState<GeneratorDie>('d10');

    useEffect(() => {
        const unsub = subscribe('time.hour', state => {
            if (state.time.hour < 6 || state.time.hour > 20) {
                setCurrentEncounter(generateNightEncounter());
            } else {
                setCurrentEncounter(generateEncounter(generatorDie));
            }
        });

        return () => {
            unsub();
        }
    }, [generateEncounter, generateNightEncounter, generatorDie]);

    useEffect(() => {
        const storedGeneratorDie = localStorage.getItem('traveler-generator-die') as GeneratorDie | null;

        if (storedGeneratorDie) {
            setGeneratorDie(storedGeneratorDie);
        }
    }, []);

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

    const generatorDieHandler = useCallback((value: GeneratorDie) => {
        setGeneratorDie(value);
        localStorage.setItem('traveler-generator-die', value);
    }, [setGeneratorDie]);

    return (
        <div>
            <Typography.Paragraph>{parsedEncounter()}</Typography.Paragraph>

            <div style={{display: 'flex'}}>
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

                <div style={{flex: 'auto'}} />

                <Space>
                    <Tooltip title="Night encounters are always hostile, so the chance is always 1d20.">
                        <Typography.Text strong>Day Encounter Chance</Typography.Text>
                    </Tooltip>

                    <Select
                        value={generatorDie}
                        onChange={generatorDieHandler}
                    >
                        <Select.Option value="d4">1d4</Select.Option>
                        <Select.Option value="d6">1d6</Select.Option>
                        <Select.Option value="d8">1d8</Select.Option>
                        <Select.Option value="d10">1d10</Select.Option>
                        <Select.Option value="d12">1d12</Select.Option>
                        <Select.Option value="d20">1d20</Select.Option>
                    </Select>
                </Space>
            </div>

            <Tabs defaultActiveKey="1">
                {currentEncounter && currentEncounter.metadata.monsters.map((monster, i) => (
                    <Tabs.TabPane tab={formatName(monster)} tabKey={i.toString()} key={i}>
                        <MonsterCard monster={monster} rollInitiative />
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default TravelerEncounters;