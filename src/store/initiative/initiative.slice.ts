import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Monster } from '../../types/monster';

export interface InitiativePlayerCharacter {
    id: string;
    initiative: number;
    type: 'player';
}

export interface InitiativeNonPlayerCharacter extends Monster {
    id: string;
    currentHP: number;
    type: 'npc';
    initiative: number;
}

export type InitiativeEntity = InitiativePlayerCharacter | InitiativeNonPlayerCharacter;

interface InitiativeState {
    entities: InitiativeEntity[];
    currentInitiative: number;
}

const initialInitiativeState: InitiativeState = {
    entities: [],
    currentInitiative: 100
}

const initiativeSlice = createSlice({
    name: 'initiative',
    initialState: initialInitiativeState,
    reducers: {
        addEntity(state, action: PayloadAction<InitiativeEntity>) {
            state.entities.push(action.payload);
        },
        editEntity(state, action: PayloadAction<{ id: string, initiative?: number, currentHP?: number }>) {
            const entity = state.entities.find(e => e.id === action.payload.id);

            if (entity) {
                if (action.payload.initiative) {
                    entity.initiative = action.payload.initiative;
                }

                if (action.payload.currentHP !== undefined && entity.type === 'npc') {
                    entity.currentHP = action.payload.currentHP;
                }
            }
        },
        removeEntity(state, action: PayloadAction<string>) {
            state.entities = state.entities.filter(e => e.id !== action.payload);
        },
        setEntities(state, action: PayloadAction<InitiativeEntity[]>) {
            state.entities = action.payload;
        },
        nextInitiative(state) {
            const entitiesAfterCurrentInitiative = state.entities.filter(e => e.initiative < state.currentInitiative);

            if (entitiesAfterCurrentInitiative.length === 0) {
                state.currentInitiative = Math.max.apply(null, state.entities.map(e => e.initiative));
            } else {
                state.currentInitiative = Math.max.apply(null, entitiesAfterCurrentInitiative.map(e => e.initiative));
            }
        },
        resetInitiative(state) {
            state.currentInitiative = 100;
        }
    }
});

export const {addEntity, editEntity, setEntities, nextInitiative, resetInitiative, removeEntity} = initiativeSlice.actions;
export default initiativeSlice.reducer;
