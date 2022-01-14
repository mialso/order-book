import {
    CONNECT_BOOKS_START_EVT, CONNECT_ERROR_EVT, CONNECT_SUBSCRIBED_EVT, DISCONNECT_SUCCESS_EVT,
    PRECISION_CHANGE_DOC, PRECISION_PROGRESS_DOC, PRECISION_PROGRESS_DONE_EVT,
} from './message'
import { CONNECT_STATUS } from './constant';

export const initialState = {
    pair: 'tBTCUSD',
    connectStatus: CONNECT_STATUS.DISCONNECTED,
    precision: 'P1',
    inProgress: null,
}

export const controlReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT_BOOKS_START_EVT: {
            return {
                ...state,
                connectStatus: CONNECT_STATUS.CONNECTING,
            };
        }
        case CONNECT_ERROR_EVT: {
            return {
                ...state,
                connectStatus: CONNECT_STATUS.ERROR,
            };
        }
        case CONNECT_SUBSCRIBED_EVT: {
            return {
                ...state,
                connectStatus: CONNECT_STATUS.SUBSCRIBED,
            };
        }
        case DISCONNECT_SUCCESS_EVT: {
            return {
                ...state,
                connectStatus: CONNECT_STATUS.DISCONNECTED,
            };
        }
        case PRECISION_CHANGE_DOC: {
            return { ...state, precision: action.payload };
        }
        case PRECISION_PROGRESS_DOC: {
            return { ...state, inProgress: { precision: action.payload }, precision: action.payload };
        }
        case PRECISION_PROGRESS_DONE_EVT: {
            if (state.inProgress && state.inProgress.precision) {
                return {
                    ...state,
                    inProgress: null,
                    precision: state.inProgress.precision,
                };
            }
            return { ...state, precision: nextValue };
        }
        default: return state
    }
}
