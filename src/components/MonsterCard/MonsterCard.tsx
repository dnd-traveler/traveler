import React, { useEffect, useState } from 'react';
import { Action, Monster } from '../../types/monster';
import { Button, Card, Col, PageHeader, Row, Tag, Typography, Space, notification } from 'antd';
import styles from './MonsterCard.module.css';
import { capitalize, getAbilityModifier, makeCancelable } from '../../util/utilities';
import TravelerD20 from '../../icons/d20';
import * as dice from 'dice.js';
import { useThemeSwitcher } from 'react-css-theme-switcher';

interface MonsterCardProps {
    monster: string;
}

const MonsterCard = (props: MonsterCardProps) => {
    const { currentTheme } = useThemeSwitcher();
    const [monster, setMonster] = useState<Monster>();

    const rollAction = (action: Action) => {
        if (action.damage_dice) {
            const attackRoll = +dice.roll('d20');
            const attackRollWithBonus = attackRoll + (action.attack_bonus || 0);
            const damageRoll = (attackRoll === 20 ?
                +dice.roll(action.damage_dice) + +dice.roll(action.damage_dice) :
                +dice.roll(action.damage_dice)) + (action.damage_bonus || 0);

            const RollResult = (
                <div>
                    <Typography.Paragraph className={styles.monsterParagraph}>
                        <Typography.Text strong>Attack Roll: </Typography.Text>{attackRollWithBonus}
                    </Typography.Paragraph>

                    <Typography.Paragraph className={styles.monsterParagraph}>
                        <Typography.Text strong>Damage Roll: </Typography.Text>{attackRoll === 20 && 'Critical Hit! '}{damageRoll} damage.
                    </Typography.Paragraph>
                </div>
            );

            notification.open({
                message: `Attack Roll for ${capitalize(action.name)}`,
                description: RollResult
            })
        }
    };

    useEffect(() => {
        const fetchMonster = makeCancelable(fetch(`https://api.open5e.com/monsters/${props.monster}`));

        fetchMonster
            .promise
            .then(response => response.json())
            .then(setMonster)
            .catch(console.error);

        return () => {
            fetchMonster.cancel();
        }
    }, [props]);

    return (
        <Card loading={!monster} style={{marginTop: 20, backgroundColor: currentTheme === 'light' ? '#F8F2D5' : 'unset'}}>
            {monster && (
                <>
                    <PageHeader
                        title={monster.name}
                        subTitle={`${monster.size} ${monster.type}, ${monster.alignment}`}
                        tags={<Tag color="red">CR {monster.challenge_rating}</Tag>}
                        extra={[
                            <Button key={1} type="primary" target="_blank" href={`https://www.dndbeyond.com/monsters/${monster.slug}`}>D&D Beyond</Button>
                        ]}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <hr />

                                <Typography.Paragraph className={styles.monsterParagraph}>
                                    <Typography.Text strong>Armor Class</Typography.Text> {monster.armor_class} ({monster.armor_desc})
                                </Typography.Paragraph>

                                <Typography.Paragraph className={styles.monsterParagraph}>
                                    <Typography.Text strong>Hit Points</Typography.Text> {monster.hit_points} ({monster.hit_dice})
                                </Typography.Paragraph>

                                <Typography.Paragraph className={styles.monsterParagraph}>
                                    <Typography.Text strong>Speed</Typography.Text>{' '}
                                    {monster.speed.walk} ft.
                                    {monster.speed.fly && `, fly ${monster.speed.fly} ft.`}
                                    {monster.speed.swim && `, swim ${monster.speed.swim} ft.`}
                                </Typography.Paragraph>

                                <Typography.Paragraph className={styles.monsterParagraph}>
                                    <Typography.Text strong>Roll Initiative!</Typography.Text> +{getAbilityModifier(monster.dexterity)}
                                </Typography.Paragraph>

                                <hr />

                                <Row>
                                    <Col span={4}>
                                        <AbilityScore ability="STR" score={monster.strength} />
                                    </Col>
                                    <Col span={4}>
                                        <AbilityScore ability="DEX" score={monster.dexterity} />
                                    </Col>
                                    <Col span={4}>
                                        <AbilityScore ability="CON" score={monster.constitution} />
                                    </Col>
                                    <Col span={4}>
                                        <AbilityScore ability="INT" score={monster.intelligence} />
                                    </Col>
                                    <Col span={4}>
                                        <AbilityScore ability="WIS" score={monster.wisdom} />
                                    </Col>
                                    <Col span={4}>
                                        <AbilityScore ability="CHA" score={monster.charisma} />
                                    </Col>
                                </Row>

                                <hr />

                                <Typography.Paragraph className={styles.monsterParagraph}>
                                    <SavingThrows monster={monster} />
                                </Typography.Paragraph>

                                {Object.keys(monster.skills).length > 0 && (
                                    <Typography.Paragraph className={styles.monsterParagraph}>
                                        <Typography.Text strong>Skills </Typography.Text>
                                        {Object.keys(monster.skills).map((skill, i) => (
                                            <Typography.Text key={i}>
                                                {capitalize(skill)} +{monster?.skills[skill]}
                                                {Object.keys(monster.skills).length - 1 !== i ? ', ' : ''}</Typography.Text>
                                        ))}
                                    </Typography.Paragraph>
                                )}

                                {monster.damage_immunities && (
                                    <Typography.Paragraph className={styles.monsterParagraph}>
                                        <Typography.Text strong>Damage Immunities </Typography.Text>
                                        <Typography.Text>{capitalize(monster.damage_immunities)}</Typography.Text>
                                    </Typography.Paragraph>
                                )}

                                {monster.damage_resistances && (
                                    <Typography.Paragraph className={styles.monsterParagraph}>
                                        <Typography.Text strong>Damage Resistances </Typography.Text>
                                        <Typography.Text>{capitalize(monster.damage_resistances)}</Typography.Text>
                                    </Typography.Paragraph>
                                )}

                                {monster.damage_vulnerabilities && (
                                    <Typography.Paragraph className={styles.monsterParagraph}>
                                        <Typography.Text strong>Damage Vulnerabilities </Typography.Text>
                                        <Typography.Text>{capitalize(monster.damage_vulnerabilities)}</Typography.Text>
                                    </Typography.Paragraph>
                                )}

                                <Typography.Paragraph className={styles.monsterParagraph}>
                                    <Typography.Text strong>Senses </Typography.Text>
                                    <Typography.Text>{monster.senses.split(' ').map(capitalize).join(' ')}</Typography.Text>
                                </Typography.Paragraph>

                                <Typography.Paragraph className={styles.monsterParagraph}>
                                    <Typography.Text strong>Languages </Typography.Text>
                                    <Typography.Text>{monster.languages.split(' ').map(capitalize).join(' ')}</Typography.Text>
                                </Typography.Paragraph>

                                <hr />

                                {Array.isArray(monster.special_abilities) && monster.special_abilities.map((ability, i) => (
                                    <Typography.Paragraph className={styles.monsterParagraph} key={i}>
                                        <Typography.Text strong>{ability.name} </Typography.Text>
                                        <Typography.Text>{ability.desc}</Typography.Text>
                                    </Typography.Paragraph>
                                ))}

                                {Array.isArray(monster.legendary_actions) && (
                                    <>
                                        <hr />

                                        <Typography.Title level={4}>Legendary Actions</Typography.Title>

                                        <Typography.Paragraph>
                                            <i>{monster.legendary_desc}</i>
                                        </Typography.Paragraph>

                                        {monster.legendary_actions.map((action, i) => (
                                            <Typography.Paragraph className={styles.monsterParagraph} key={i}>
                                                <Typography.Text strong>{action.name}. </Typography.Text>
                                                <Typography.Text>{action.desc}</Typography.Text>
                                            </Typography.Paragraph>
                                        ))}
                                    </>
                                )}
                            </Col>

                            <Col span={12}>
                                <Typography.Title level={4}>Actions</Typography.Title>

                                {monster.actions.map((action, i) => (
                                    <Typography.Paragraph className={styles.monsterParagraph} key={i}>
                                        <Typography.Text strong>{action.name}. </Typography.Text>
                                        <Typography.Text>{action.desc}</Typography.Text>
                                    </Typography.Paragraph>
                                ))}

                                <Space>
                                    {monster.actions.filter(action => action.damage_dice).map((action, i) => (
                                        <Button danger onClick={() => rollAction(action)} key={i}>
                                            <TravelerD20 />
                                            {capitalize(action.name)}
                                        </Button>
                                    ))}
                                </Space>
                            </Col>
                        </Row>
                    </PageHeader>
                </>
            )}
        </Card>
    )
};

type AbilityScoreType = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

type SavingThrowMap = {
    [key in AbilityScoreType]: number | null;
}

const SavingThrows = ({ monster }: { monster: Monster }) => {
    const savingThrowMap: SavingThrowMap = {
        STR: monster.strength_save,
        DEX: monster.dexterity_save,
        CON: monster.constitution_save,
        INT: monster.intelligence_save,
        WIS: monster.wisdom_save,
        CHA: monster.charisma_save
    };

    const savingThrowKeys = Object.keys(savingThrowMap).filter(save => savingThrowMap[save as AbilityScoreType]);

    return (
        <>
            {savingThrowKeys.length > 0 && <Typography.Text strong>Saving Throws </Typography.Text>}

            {
                savingThrowKeys.map((save, i) => {
                    const saveAsType = save as AbilityScoreType;

                    return (
                        <Typography.Text key={i}>
                            {save} +{savingThrowMap[saveAsType]}
                            {savingThrowKeys.length - 1 !== i ? ', ' : ''}
                        </Typography.Text>
                    )
                })
            }
        </>
    )
};

const AbilityScore = ({ ability, score }: { ability: string, score: number }) => {
    const modifier = getAbilityModifier(score);
    const formattedModifier = modifier >= 0 ? `+${modifier}` : modifier;

    return (
        <div style={{textAlign: 'center'}}>
            <Typography.Paragraph style={{marginBottom: 0}} strong>{ability}</Typography.Paragraph>
            <Typography.Paragraph style={{marginBottom: 0}}>{score} ({formattedModifier})</Typography.Paragraph>
        </div>
    );
};

export default MonsterCard;
