import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PlayerCharacter, editPlayer, addPlayer, removePlayer } from '../../store/players/players.slice';
import Chance from 'chance';
import { Button, Divider, Form, Input, InputNumber, List, Modal, Space, Statistic } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const chance = new Chance();

const TravelerPlayers = () => {
    const dispatch = useDispatch();
    const { players } = useSelector((state: RootState) => state.players);
    const [editPlayerForm] = Form.useForm();

    const [editingPlayer, setEditingPlayer] = useState<string | null>(null);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const setEditingPlayerHandler = useCallback((pid: string) => {
        const player = players.find(p => p.id === pid);

        if (!player) {
            return undefined;
        }

        editPlayerForm.setFieldsValue({
            name: player.name,
            maxHP: player.maxHP,
            armorClass: player.armorClass,
            level: player.level
        });

        setEditingPlayer(pid);
    }, [players, editPlayerForm]);

    const playerEditHandler = useCallback((player: Pick<PlayerCharacter, 'name' | 'maxHP' | 'armorClass' | 'level'>) => {
        const playerToEdit = players.find(p => p.id === editingPlayer);

        if (!playerToEdit) {
            return;
        }

        dispatch(editPlayer({
            ...playerToEdit,
            ...player,
            currentHP: Math.max(player.maxHP - (playerToEdit.maxHP - playerToEdit.currentHP), 0)
        }));
    }, [dispatch, editingPlayer, players]);

    const playerRemoveHandler = useCallback((pid: string) => {
        dispatch(removePlayer(pid));
    }, [dispatch])

    const playerHealthChangeHandler = useCallback((hp: number, pid: string) => {
        const playerToEdit = players.find(p => p.id === pid);

        if (!playerToEdit) {
            return;
        }

        dispatch(editPlayer({
            ...playerToEdit,
            currentHP: Math.max(Math.min(playerToEdit.currentHP + hp, playerToEdit.maxHP), 0)
        }));
    }, [players, dispatch]);

    const addNewPlayer = useCallback(() => {
        dispatch(addPlayer({
            id: chance.guid(),
            name: 'New Player',
            maxHP: 8,
            currentHP: 8,
            armorClass: 10,
            level: 1,
            type: 'player'
        }));
    }, [dispatch]);

    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={players}
                renderItem={player => (
                    <PlayerItem
                        player={player}
                        onHPChange={playerHealthChangeHandler}
                        onEdit={setEditingPlayerHandler}
                        onRemove={playerRemoveHandler}
                    />
                )}
            />

            <Divider>
                <Button onClick={addNewPlayer}>Add Player</Button>
            </Divider>

            <Modal
                title={`Editing ${players.find(p => p.id === editingPlayer)?.name}`}
                visible={!!editingPlayer}
                onOk={() => {
                    editPlayerForm
                        .validateFields()
                        .then(values => {
                            playerEditHandler({
                                name: values.name,
                                maxHP: values.maxHP,
                                armorClass: values.armorClass,
                                level: values.level
                            });

                            setEditingPlayer(null);
                            editPlayerForm.resetFields();
                        })
                        .catch(console.error);
                }}
                onCancel={() => setEditingPlayer(null)}
            >
                <Form
                    {...layout}
                    form={editPlayerForm}
                    name="edit-player"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Name is required!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="maxHP"
                        label="Max HP"
                        rules={[{ required: true, message: 'Max HP is required!' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>

                    <Form.Item
                        name="armorClass"
                        label="Armor Class"
                        rules={[{ required: true, message: 'Armor Class is required!' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>

                    <Form.Item
                        name="level"
                        label="Level"
                        rules={[{ required: true, message: 'Level is required!' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

interface PlayerItemProps {
    player: PlayerCharacter;
    onHPChange: (hp: number, pid: string) => void;
    onEdit: (pid: string) => void;
    onRemove: (pid: string) => void;
}

const PlayerItem = ({ player, onHPChange, onEdit, onRemove }: PlayerItemProps) => {
    const [hitMod, setHitMod] = useState(0);
    const { currentTheme } = useThemeSwitcher();

    const healHandler = useCallback(() => {
        onHPChange(hitMod, player.id);
        setHitMod(0);
    }, [hitMod, onHPChange, player]);

    const damageHandler = useCallback(() => {
        onHPChange(hitMod * -1, player.id);
        setHitMod(0);
    }, [hitMod, onHPChange, player]);

    const hitModChangeHandler = useCallback((value: string | number | undefined) => {
        if (value) {
            setHitMod(+value);
        }
    }, []);

    const onEditHandler = useCallback(() => {
        onEdit(player.id);
    }, [onEdit, player]);

    const onRemoveHandler = useCallback(() => {
        onRemove(player.id);
    }, [onRemove, player]);

    return (
        <>
            <List.Item
                key={player.id}
                extra={(
                    <Statistic
                        title="Hit Points"
                        value={player.currentHP}
                        suffix={`/ ${player.maxHP}`}
                        valueStyle={{color: player.currentHP === player.maxHP ? '#3f8600' : player.currentHP === 0 ? '#cf1322' : 'unset'}}
                    />
                    )}
                style={{border: '2px solid', borderColor: currentTheme === 'light' ? '#d9d9d9' : '#505050', marginBottom: 10}}
            >
                <List.Item.Meta
                    title={(
                        <>
                            {player.name}
                            <Button type="link" onClick={onEditHandler}>Edit</Button>
                            <Button type="link" danger onClick={onRemoveHandler}>Remove</Button>
                        </>
                    )}
                    description={`Level ${player.level} / Armor Class ${player.armorClass}`}
                />

                <Space>
                    <InputNumber min={0} value={hitMod} onChange={hitModChangeHandler} />

                    <Button type="primary" onClick={healHandler}>Heal</Button>
                    <Button type="primary" danger onClick={damageHandler}>Damage</Button>
                </Space>
            </List.Item>
        </>
    )
};

export default TravelerPlayers;