import {
    connectFail, connectSuccess, connectSubscribed, connectBooksStart,
    setBooksSnapshot, setBooksChange, disconnectSuccess,
    CONNECT_BOOKS_CMD, DISCONNECT_BOOKS_CMD,
} from './message';
import { DUPLICATE_CONNECTION, ABSENT_CONNECTION } from './constant';

const isSnapshot = (data) => (data[0] && Array.isArray(data[1]) && Array.isArray(data[1][0]))

const createHandshakeHandler = (dispatch) => (socket, config) => {
    currentSocket.onopen = () => {
        socket.send(JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: config.pair,
            prec: 'P0',
            freq: 'F0',
        }));
        dispatch(connectSuccess());
    };
}

const createMessageHandler = (dispatch) => (socket) => {
    let changeBuffer = []
    socket.onmessage = (evt) => {

        const data = JSON.parse(evt.data)
        if (Array.isArray(data)) {
            if (isSnapshot(data)) {
                dispatch(setBooksSnapshot(data[1]))
                // console.log(`snapshot: ${JSON.stringify(data)}`);
            } else if (Array.isArray(data[1])) {
                // dispatch(setBooksChange([data[1]]))
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
        dispatch(setBooksChange(changeBuffer));
        changeBuffer = [];
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
        case CONNECT_BOOKS_CMD: {
            if (currentSocket) {
                dispatch(connectFail(DUPLICATE_CONNECTION));
                break
            }
            currentSocket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
            const state = getState();
            initialHandshake(currentSocket, state.config);
            handlerCleanup = handleMessages(currentSocket);
            dispatch(connectBooksStart());
            break;

        }
        case DISCONNECT_BOOKS_CMD: {
            if (handlerCleanup) {
                handlerCleanup()
            }
            if (!currentSocket) {
                dispatch(connectFail(ABSENT_CONNECTION));
                break
            }
            currentSocket.close();
            currentSocket = null;
            dispatch(disconnectSuccess());
        }
        default: break;
    }
};
