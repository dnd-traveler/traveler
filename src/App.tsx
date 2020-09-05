import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Button, Card, Col, Layout, Row } from 'antd';
import TravelerTime from './components/TravelerTime/TravelerTime';
import TravelerNotes from './components/TravelerNotes/TravelerNotes';
import TravelerEncounters from './components/TravelerEncounters/TravelerEncounters';
import TravelerWeather from './components/TravelerWeather/TravelerWeather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { setHour, setSeason, setDay } from './store/time/time.slice';

const {Header, Content, Footer} = Layout;

function App() {
    const time = useSelector((state: RootState) => state.time);
    const dispatch = useDispatch();
    const { switcher, status, themes } = useThemeSwitcher();
    const [encounterLoading, setEncounterLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);

    const resetState = useCallback(() => {
        dispatch(setHour(7));
        dispatch(setDay(1));
        dispatch(setSeason('spring'));
        localStorage.removeItem('traveler-state');
    }, [dispatch]);

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
        }, 500);
    }, [time]);

    if (status === "loading") {
        return null;
    }

    return (
        <Layout className="layout">
            <Header className="header">
                <div className="logo">Traveler</div>
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

                <Row gutter={16} style={{marginTop: 10}}>
                    <Col span={8}>
                        <Card title="Weather" loading={weatherLoading}>
                            <TravelerWeather />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Encounters" loading={encounterLoading}>
                            <TravelerEncounters />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Notes">
                            <TravelerNotes />
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer style={{textAlign: 'center'}}>Traveler by Jackson Yeager</Footer>
        </Layout>
    );
}

export default App;
