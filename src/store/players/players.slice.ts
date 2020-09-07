import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerCharacter {
    id: string;
    name: string;
    maxHP: number;
    currentHP: number;
    armorClass: number;
    level: number;
    type: 'player';
}

const initialPlayerListState: { players: PlayerCharacter[] } = {
    players: []
};

const playerListSlice = createSlice({
    name: 'player-list',
    initialState: initialPlayerListState,
    reducers: {
        addPlayer(state, action: PayloadAction<PlayerCharacter>) {
            state.players.push(action.payload);
        },
        removePlayer(state, action: PayloadAction<string>) {
            state.players = state.players.filter(p => p.id !== action.payload);
        },
        editPlayer(state, action: PayloadAction<PlayerCharacter>) {
            const player = state.players.find(p => p.id === action.payload.id);

            if (player) {
                player.name = action.payload.name;
                player.maxHP = action.payload.maxHP;
                player.currentHP = action.payload.currentHP;
                player.armorClass = action.payload.armorClass;
                player.level = action.payload.level;
            }
        }
    }
});

export const { addPlayer, removePlayer, editPlayer } = playerListSlice.actions;
export default playerListSlice.reducer;