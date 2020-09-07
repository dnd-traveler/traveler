import React, { useCallback, useEffect, useState } from 'react';
import { Monster } from '../../types/monster';
import { Space, Tag, AutoComplete, Typography, Tooltip } from 'antd';
import { debounce } from 'lodash';

const renderItem = (monster: Monster) => {
    return {
        value: monster.slug,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography.Text ellipsis>{monster.name}</Typography.Text>
                <Space>
                    <Tag color="red">CR {monster.challenge_rating}</Tag>
                    <Tag color="blue">HP {monster.hit_points}</Tag>
                </Space>
            </div>
        )
    }
}

interface MonsterSearchProps {
    onResult: (monster: Monster) => void;
}

const MonsterSearch = (props: MonsterSearchProps) => {
    const { onResult } = props;
    const [searchResults, setSearchResults] = useState<Monster[]>([]);
    const [searchTerm, setSearchTerm] = useState();

    const searchForMonsters = useCallback(debounce((search: string) => {
        if (search) {
            fetch(`https://api.open5e.com/monsters/?search=${search}`)
                .then(response => response.json())
                .then(response => setSearchResults(response.results))
                .catch(console.error);
        }
    }, 500), []);

    const selectHandler = useCallback((value: string) => {
        const monster = searchResults.find(m => m.slug === value);

        if (monster) {
            onResult(monster);
            setSearchTerm('');
            setSearchResults([]);
        }
    }, [searchResults, onResult]);

    const searchTermHandler = (value: string) => {
        setSearchTerm(value);
    }

    useEffect(() => {
        searchForMonsters(searchTerm);
    }, [searchForMonsters, searchTerm]);

    return (
        <>
            <Tooltip
                trigger={['focus']}
                title="Add a Monster to Initiative Tracker"
            >
                <AutoComplete
                    options={searchResults.map(renderItem)}
                    style={{ width: 400 }}
                    value={searchTerm}
                    onSearch={searchTermHandler}
                    onSelect={selectHandler}
                    placeholder="Adult Gold Dragon"
                />
            </Tooltip>
        </>
    )
};

export default MonsterSearch;