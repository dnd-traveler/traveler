import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
    addEntity,
    nextInitiative,
    setEntities,
    resetInitiative,
    editEntity,
    InitiativePlayerCharacter, InitiativeNonPlayerCharacter, removeEntity
} from '../../store/initiative/initiative.slice';
import { Button, Collapse, InputNumber, List, Space, Statistic, Typography } from 'antd';
import { PlayerCharacter } from '../../store/players/players.slice';
import MonsterCard from '../MonsterCard/MonsterCard';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import classNames from 'classnames';
import styles from './TravelerInitiative.module.css';
import MonsterSearch from './MonsterSearch';
import { Monster } from '../../types/monster';
import Chance from 'chance';
import dice from "dice.js";
import { getAbilityModifier } from '../../util/utilities';

type PlayerWithInitiative = PlayerCharacter & InitiativePlayerCharacter;
type PopulatedInitiativeEntity = PlayerWithInitiative | InitiativeNonPlayerCharacter;

const chance = new Chance();

const TravelerInitiative = () => {
    const dispatch = useDispatch();
    const players = useSelector((state: RootState) => state.players);
    const {currentInitiative, entities} = useSelector((state: RootState) => state.initiative);

    const [populatedEntities, setPopulatedEntities] = useState<PopulatedInitiativeEntity[]>([]);

    const addPlayersToInitiative = useCallback(() => {
        for (const player of players.players) {
            dispatch(addEntity({
                id: player.id,
                initiative: 0,
                type: 'player'
            }));
        }
    }, [players, dispatch]);

    const nextInitiativeHandler = useCallback(() => {
        dispatch(nextInitiative());
    }, [dispatch]);

    const clearInitiativeHandler = useCallback(() => {
        dispatch(setEntities([]));
        dispatch(resetInitiative());
    }, [dispatch])

    const getEntitiesSortedByInitiative = useCallback(() => {
        return [...populatedEntities].sort((a, b) => b.initiative - a.initiative);
    }, [populatedEntities]);

    const editInitiativeHandler = useCallback((newInitiative: number, eid: string) => {
        dispatch(editEntity({
            id: eid,
            initiative: newInitiative
        }));
    }, [dispatch]);

    const npcHealthChangeHandler = useCallback((hp: number, eid: string) => {
        const entityToEdit = populatedEntities.find(e => e.id === eid);

        if (!entityToEdit || entityToEdit.type !== 'npc') {
            return;
        }

        dispatch(editEntity({
            id: eid,
            currentHP: Math.max(Math.min(entityToEdit.currentHP + hp, entityToEdit.hit_points), 0)
        }))
    }, [dispatch, populatedEntities]);

    const addMonsterToInitiative = useCallback((monster: Monster) => {
        dispatch(addEntity({
            ...monster,
            initiative: dice.roll('d20') + getAbilityModifier(monster.dexterity),
            id: chance.guid(),
            currentHP: monster.hit_points,
            type: 'npc'
        }));
    }, [dispatch]);

    const removeHandler = useCallback((eid: string) => {
        dispatch(removeEntity(eid));
    }, [dispatch]);

    useEffect(() => {
        const list: PopulatedInitiativeEntity[] = [];

        for (const entity of entities) {
            if (entity.type === 'player') {
                const fullPlayer = players.players.find(p => p.id === entity.id);

                if (fullPlayer) {
                    list.push({
                        ...fullPlayer,
                        initiative: entity.initiative,
                        type: 'player'
                    });
                } else {
                    dispatch(removeEntity(entity.id));
                }
            } else if (entity.type === 'npc') {
                list.push(entity);
            }
        }

        setPopulatedEntities(list);
    }, [entities, players, dispatch]);

    return (
        <>
            <div style={{display: 'flex'}}>
                <Space>
                    <Button onClick={addPlayersToInitiative}>Add All Players</Button>
                    <Button onClick={nextInitiativeHandler}>Next Initiative</Button>
                    <Button onClick={clearInitiativeHandler} danger>Clear Initiative</Button>
                </Space>

                <div style={{flex: 1}} />
                <MonsterSearch onResult={addMonsterToInitiative} />
            </div>

            <List
                itemLayout="vertical"
                size="large"
                style={{marginTop: 10}}
                dataSource={getEntitiesSortedByInitiative()}
                renderItem={entity => (
                    <InitiativeEntityItem
                        entity={entity}
                        active={currentInitiative === entity.initiative}
                        onInitiativeEdit={editInitiativeHandler}
                        onHPChange={npcHealthChangeHandler}
                        onRemove={removeHandler}
                    />
                )}
            />

            <Typography.Paragraph
                type="secondary"
                style={{textAlign: 'center', fontStyle: 'italic', marginBottom: 0}}
            >
                Tip: Click the initiative number to change it.
            </Typography.Paragraph>
        </>
    );
};

interface InitiativeEntityItemProps {
    entity: PopulatedInitiativeEntity;
    active: boolean;
    onInitiativeEdit: (newInitiative: number, eid: string) => void;
    onHPChange: (hp: number, eid: string) => void;
    onRemove: (eid: string) => void;
}

const InitiativeEntityItem = (props: InitiativeEntityItemProps) => {
    const { currentTheme } = useThemeSwitcher();
    const {entity, active, onInitiativeEdit, onHPChange, onRemove} = props;
    const [hitMod, setHitMod] = useState(0);
    const [editingInitiative, setEditingInitiative] = useState(false);
    const [editInitiativeValue, setEditInitiativeValue] = useState(0);

    const entityDescription = entity.type === 'player' ?
        `Level ${entity.level} / Armor Class ${entity.armorClass}` :
        `CR ${entity.challenge_rating} / Armor Class ${entity.armor_class} (${entity.armor_desc})`

    const activeStyle = classNames({
        [`${styles.initiativeBoxLight}`]: currentTheme === 'light',
        [`${styles.initiativeBoxDark}`]: currentTheme === 'dark',
        [`${styles.active}`]: active
    });

    const healHandler = () => {
        onHPChange(hitMod, entity.id);
        setHitMod(0);
    };

    const damageHandler = () => {
        onHPChange(hitMod * -1, entity.id);
        setHitMod(0);
    };

    const hitModChangeHandler = (value: string | number | undefined) => {
        if (value !== undefined) {
            setHitMod(+value);
        }
    };

    const editInitiativeValueHandler = (value: number | string | undefined) => {
        if (value !== undefined) {
            setEditInitiativeValue(+value);
        }
    };

    const editInitiativeHandler = (value: boolean) => {
        if (value) {
            setEditInitiativeValue(entity.initiative);
        }

        setEditingInitiative(value);
    };

    const initiativeEditKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onInitiativeEdit(editInitiativeValue, entity.id);
            editInitiativeHandler(false);
        }
    };

    const removeHandler = () => {
        onRemove(entity.id);
    }

    const getInitiativeBox = () => {
        if (editingInitiative) {
            return <InputNumber value={editInitiativeValue} onChange={editInitiativeValueHandler}
                                onKeyDown={initiativeEditKeyHandler} autoFocus/>
        } else {
            return (
                <div onClick={() => editInitiativeHandler(true)}>
                    <Statistic title="Initiative" value={entity.initiative}/>
                </div>
            )
        }
    };

    return (
        <>
            <List.Item
                key={entity.id}
                extra={(
                    <Statistic
                        title="Hit Points"
                        value={entity.currentHP}
                        suffix={`/ ${entity.type === 'player' ? entity.maxHP : entity.hit_points}`}
                        valueStyle={
                            {
                                color: entity.currentHP === (entity.type === 'player' ? entity.maxHP : entity.hit_points) ?
                                    '#3f8600' :
                                    entity.currentHP === 0 ? '#cf1322' : 'unset'
                            }
                        }
                    />
                )}
                className={activeStyle}
                style={{marginBottom: 10}}
            >
                <List.Item.Meta
                    title={(
                        <>
                            {entity.name}
                            <Button type="link" danger onClick={removeHandler}>Remove</Button>
                        </>
                    )}
                    description={entityDescription}
                    avatar={getInitiativeBox()}
                />

                {entity.type === 'npc' && (
                    <>
                        <Space>
                            <InputNumber min={0} value={hitMod} onChange={hitModChangeHandler} />

                            <Button type="primary" onClick={healHandler}>Heal</Button>
                            <Button type="primary" danger onClick={damageHandler}>Damage</Button>
                        </Space>

                        <Collapse style={{marginTop: 10}}>
                            <Collapse.Panel key={0} header="Monster Card">
                                <MonsterCard monster={entity.slug} />
                            </Collapse.Panel>
                        </Collapse>
                    </>
                )}
            </List.Item>
        </>
    );
}

export default TravelerInitiative;