import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Button, Card, Col, Layout, Row } from 'antd';
import TravelerTime from './components/TravelerTime/TravelerTime';
import TravelerEncounters from './components/TravelerEncounters/TravelerEncounters';
import TravelerWeather from './components/TravelerWeather/TravelerWeather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { setHour, setSeason, setDay } from './store/time/time.slice';
import TravelerInitiative from './components/TravelerInitiative/TravelerInitiative';
import TravelerPlayers from './components/TravelerPlayers/TravelerPlayers';
import { activate, deactivate } from './store/jojo/jojo.slice';

const {Header, Content, Footer} = Layout;

function App() {
    const time = useSelector((state: RootState) => state.time);
    const dispatch = useDispatch();
    const jojo = useSelector((state: RootState) => state.jojo);
    const { switcher, status, themes } = useThemeSwitcher();
    const [encounterLoading, setEncounterLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [clicks, setClicks] = useState(0);

    const resetState = useCallback(() => {
        dispatch(setHour(7));
        dispatch(setDay(1));
        dispatch(setSeason('spring'));
    }, [dispatch]);

    const clickHandler = () => {
        setClicks(prevState => prevState + 1);
    };

    useEffect(() => {
        if (clicks >= 5) {
            if (jojo.active) {
                dispatch(deactivate());
            } else {
                dispatch(activate());

                const openingAudio = new Audio('/media/jojo-opening.mp4');
                openingAudio.play();
            }

            setClicks(0);
        }
    }, [clicks, dispatch, jojo]);

    useEffect(() => {
        switcher({
            theme: time.hour < 6 || time.hour > 20 ? themes.dark : themes.light
        })
    }, [time, switcher, themes]);

    useEffect(() => {
        setEncounterLoading(true);

        if (time.hour % 6 === 0) {
            setWeatherLoading(true);
        }

        setTimeout(() => {
            setEncounterLoading(false);
            setWeatherLoading(false);
        }, 300);
    }, [time]);

    if (status === "loading") {
        return null;
    }

    return (
        <Layout className="layout">
            <Header className="header">
                <div className="logo" onClick={clickHandler}>{jojo.active ? 'JOJO\'S BIZARRE D&D APP' : 'Traveler'}</div>
                <div style={{flex: 1}} />
                <Button type="primary" danger onClick={resetState}>Reset Time</Button>
            </Header>
            <Content style={{padding: '50px'}}>
                <Row gutter={16}>
                    <Col span={10} offset={7}>
                        <Card>
                            <TravelerTime />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16} style={{marginTop: 16}}>
                    <Col span={8}>
                        <Card title="Weather" loading={weatherLoading}>
                            <TravelerWeather />
                        </Card>

                        <Card title="Player Characters" style={{marginTop: 16}}>
                            <TravelerPlayers />
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title="Encounters" loading={encounterLoading}>
                            <TravelerEncounters />
                        </Card>

                        <Card title="Initiative Tracker" style={{marginTop: 16}}>
                            <TravelerInitiative />
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer style={{textAlign: 'center'}}>Traveler by Jackson Yeager</Footer>
        </Layout>
    );
}

export default App;
