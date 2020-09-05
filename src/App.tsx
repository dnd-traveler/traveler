import React, { useEffect } from 'react';
import './App.css';
import { Card, Col, Layout, Row } from 'antd';
import TravelerTime from './components/TravelerTime/TravelerTime';
import TravelerNotes from './components/TravelerNotes/TravelerNotes';
import TravelerEncounters from './components/TravelerEncounters/TravelerEncounters';
import TravelerWeather from './components/TravelerWeather/TravelerWeather';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const {Header, Content, Footer} = Layout;

function App() {
    const time = useSelector((state: RootState) => state.time);
    const { switcher, status, themes } = useThemeSwitcher();

    useEffect(() => {
        switcher({
            theme: time.hour < 6 || time.hour > 20 ? themes.dark : themes.light
        })
    }, [time, switcher, themes]);

    if (status === "loading") {
        return null;
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo">Traveler</div>
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
                        <Card title="Weather">
                            <TravelerWeather />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Encounters">
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
