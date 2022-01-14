import { PRECISION_CHANGE_CMD, setPrecision } from './message';
import { controlState } from './selector';


export const controlCtrl = ({ getState, dispatch }, action) => {
    switch (action.type) {
        case PRECISION_CHANGE_CMD: {
            const state = controlState(getState());
            if (state.connectStatus === 'DISCONNECTED') {
                dispatch(setPrecision(action.payload));
                break;
            }
            break;
        }
        default: break;
    }
}
