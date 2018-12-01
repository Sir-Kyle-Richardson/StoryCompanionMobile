import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { LOGS } from '../config/Logs.js';

/**
 * Changing key will cause the storage to be reset
 */
const PERSIST_CONFIG = {
    key: '1.0.0',
    storage: AsyncStorage,
}

const INITIAL_STATE = {
    apiKey: null,
    email: null,
    userId: null,
    selectedStoryId: null,
    stories: null,
    chapters: null,
    tags: null,
    plots: null,
    characters: null,
}

const reducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case "LOGIN":
            newState = {
                ...state,
                apiKey: action.payload.apiKey,
                email: action.payload.email,
                userId: action.payload.id,
            };
            break;
        case "SET_STORIES":
            newState = {
                ...state,
                stories: action.payload,
            }
            break;
        case "EDIT_COMPONENTS":
            newState = {
                ...state,
                selectedStoryId: action.payload
            };
            break;
        case "SET_TAGS":
            newState = {
                ...state,
                tags: action.payload
            };
            break;
        case "LOGOUT":
            newState = INITIAL_STATE;
            break;
    }

    if (LOGS.ENABLE_LOGS) {
        console.info("Updating AppStore: ", {
            state: newState,
            action: action,
        });
    }

    return newState;
}

const persistedReducer = persistReducer(PERSIST_CONFIG, reducer);

export const AppStore = createStore(persistedReducer);
export const Persistor = persistStore(AppStore);