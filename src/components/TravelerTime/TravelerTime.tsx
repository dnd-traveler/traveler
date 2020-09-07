import React from 'react';

import styles from './TravelerTime.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { incrementHour, incrementSeason } from '../../store/time/time.slice';
import { Button, Divider, Space, Typography } from 'antd';
import { capitalize, formatTime } from '../../util/utilities';

const TravelerTime = () => {
    const dispatch = useDispatch();
    const jojo = useSelector((state: RootState) => state.jojo);
    const currentTime = useSelector((state: RootState) => state.time);

    const advanceTime = () => {
        dispatch(incrementHour());

        if (jojo.active) {
            const timeSkipAudio = new Audio('./media/time-skip.mp3');
            timeSkipAudio.play();
        }
    };

    const advanceSeason = () => {
        dispatch(incrementSeason());
    }

    return (
        <div className={styles.TravelerTime}>
            <Typography.Paragraph strong style={{marginBottom: 0}}>{capitalize(currentTime.season)}</Typography.Paragraph>

            <Typography.Title style={{marginTop: 0}}>
                {formatTime(currentTime.hour)}
                <Divider className={styles.DividerStyle} type="vertical" />
                Day {currentTime.day}
            </Typography.Title>

            <Space>
                <Button type="primary" onClick={advanceTime}>Advance Time</Button>
                <Button type="primary" onClick={advanceSeason}>Advance Season</Button>
            </Space>
        </div>
    )
};

export default TravelerTime;