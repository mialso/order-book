import { NETWORK_OFFLINE_EVT, NETWORK_ONLINE_EVT } from '../service/network';
import { setBooksSnapshot, setBooksChange } from './message';
import {
    connectFail, connectSuccess, connectSubscribed, connectBooksStart,
    disconnectSuccess,
    CONNECT_BOOKS_CMD, DISCONNECT_BOOKS_CMD,
} from './control/message';
import { controlState } from './control/selector';

import { DUPLICATE_CONNECTION, ABSENT_CONNECTION } from './constant';

const isSnapshot = (data) => (data[0] && Array.isArray(data[1]) && Array.isArray(data[1][0]))

const createHandshakeHandler = (dispatch) => (socket, control) => {
    currentSocket.onopen = () => {
        socket.send(JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: control.pair,
            prec: control.precision,
            freq: 'F0',
        }));
        dispatch(connectSuccess());
    };
}

// TODO
/*
const createErrorHandler = () => (socket) => {
    socket.onerror = (evt) => {
    }
    socket.onclose = (evt) => {
        if (evt.code === 1000 && evt.reason === 'disconnect') {
            // we did it, do nothing
            return;
        }
    }
}
*/

const createMessageHandler = (dispatch) => (socket) => {
    let changeBuffer = []
    socket.onmessage = (evt) => {

        const data = JSON.parse(evt.data)
        if (Array.isArray(data)) {
            if (isSnapshot(data)) {
                dispatch(setBooksSnapshot(data[1]))
                // console.log(`snapshot: ${JSON.stringify(data)}`);
            } else if (Array.isArray(data[1])) {
                changeBuffer.push(data[1]);
                // console.log(`change: ${JSON.stringify(data)}`);
            } else {
                // maybe heartbreak
            }

        } else {
            switch (data.event) {
                case 'subscribed': {
                    dispatch(connectSubscribed(data));
                    break;
                }
                default: break;
            }
            
        }
    };
    const updateIntervalId = setInterval(() => {
        if (changeBuffer.length > 0) {
            dispatch(setBooksChange(changeBuffer));
            changeBuffer = [];
        }
    }, 100)
    return () => {
        clearInterval(updateIntervalId);
    }
}

let currentSocket = null
let handlerCleanup = null

export const bookRemoteDataCtrl = ({ dispatch, getState }, message) => {
    const handleMessages = createMessageHandler(dispatch);
    const initialHandshake = createHandshakeHandler(dispatch);
    switch (message.type) {
        case NETWORK_ONLINE_EVT:
        case CONNECT_BOOKS_CMD: {
            if (currentSocket) {
                dispatch(connectFail(DUPLICATE_CONNECTION));
                break
            }
            currentSocket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
            const state = getState();
            // TODO: createErrorHandler()(currentSocket);
            initialHandshake(currentSocket, controlState(state));
            handlerCleanup = handleMessages(currentSocket);
            dispatch(connectBooksStart());
            break;

        }
        case NETWORK_OFFLINE_EVT:
        case DISCONNECT_BOOKS_CMD: {
            if (handlerCleanup) {
                handlerCleanup()
            }
            if (!currentSocket) {
                dispatch(connectFail(ABSENT_CONNECTION));
                break
            }
            currentSocket.close(1000, 'disconnect');
            currentSocket = null;
            dispatch(disconnectSuccess());
        }
        default: break;
    }
};
