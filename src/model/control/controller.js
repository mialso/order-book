import {
    PRECISION_CHANGE_CMD, setPrecision, setPrecisionProgress, setPrecisionProgressDone,
    connectBooks, disconnectBooks, DISCONNECT_SUCCESS_EVT, CONNECT_SUBSCRIBED_EVT,
} from './message';
import { controlState } from './selector';
import { CONNECT_STATUS } from './constant';


export const controlCtrl = ({ getState, dispatch }, action) => {
    switch (action.type) {
        case PRECISION_CHANGE_CMD: {
            const state = controlState(getState());
            if (state.precision === action.payload) {
                break;
            }
            if (state.connectStatus === CONNECT_STATUS.DISCONNECTED) {
                dispatch(setPrecision(action.payload));
                break;
            }
            if (state.connectStatus === CONNECT_STATUS.SUBSCRIBED) {
                dispatch(setPrecisionProgress(action.payload));
                dispatch(disconnectBooks());
                break;
            }
            break;
        }
        case DISCONNECT_SUCCESS_EVT: {
            const state = controlState(getState());
            if (state.inProgress && state.inProgress.precision) {
                dispatch(connectBooks());
                break;
            }
            break;
        }
        case CONNECT_SUBSCRIBED_EVT: {
            const state = controlState(getState());
            if (state.inProgress && state.inProgress.precision) {
                dispatch(setPrecisionProgressDone());
                break;
            }
            break;
        }
        default: break;
    }
}
