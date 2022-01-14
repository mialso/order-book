import {
    CONNECT_BOOKS_START_EVT, CONNECT_ERROR_EVT, CONNECT_SUBSCRIBED_EVT, DISCONNECT_SUCCESS_EVT,
    PRECISION_CHANGE_DOC,
} from './message'

export const initialState = {
    pair: 'tBTCUSD',
    connectStatus: 'DISCONNECTED',
    precision: 'P1',
}

export const controlReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT_BOOKS_START_EVT: {
            return {
                ...state,
                connectStatus: 'CONNECTING',
            };
        }
        case CONNECT_ERROR_EVT: {
            return {
                ...state,
                connectStatus: 'ERROR',
            };
        }
        case CONNECT_SUBSCRIBED_EVT: {
            return {
                ...state,
                connectStatus: 'SUBSCRIBED',
            };
        }
        case DISCONNECT_SUCCESS_EVT: {
            return {
                ...state,
                connectStatus: 'DISCONNECTED',
            };
        }
        case PRECISION_CHANGE_DOC: {
            const nextValue = action.payload;
            if (state.precision === nextValue) {
                return state
            }
            return { ...state, precision: nextValue }
        }
        default: return state
    }
}

