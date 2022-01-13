import { UNKNOWN_ERROR } from './constant';

export const CONNECT_BOOKS_CMD = 'cmd/books/connect';
export const DISCONNECT_BOOKS_CMD = 'cmd/books/disconnect';
export const CONNECT_BOOKS_START_EVT = 'evt/books/connect/start';
export const CONNECT_ERROR_EVT = 'evt/books/connect/error';
export const CONNECT_SUCCESS_EVT = 'evt/books/connect/success';
export const CONNECT_INFO_EVT = 'evt/books/connect/info';
export const CONNECT_SUBSCRIBED_EVT = 'evt/books/connect/subscribed';
export const DISCONNECT_SUCCESS_EVT = 'evt/books/disconnect/success';

export const BOOKS_SNAPSHOT_DOC = 'doc/books/snapshot';
export const BOOKS_CHANGE_DOC = 'doc/books/change';

export const connectBooks = () => ({
    type: CONNECT_BOOKS_CMD,
});
export const connectBooksStart = () => ({
    type: CONNECT_BOOKS_START_EVT,
});
export const disconnectBooks = () => ({
    type: DISCONNECT_BOOKS_CMD,
});

export const connectFail = (reason = UNKNOWN_ERROR) => ({
    type: CONNECT_ERROR_EVT,
    payload: reason,
});
export const connectSuccess = () => ({
    type: CONNECT_SUCCESS_EVT,
});
export const connectSubscribed = (data) => ({
    type: CONNECT_SUBSCRIBED_EVT,
    payload: data,
});
export const disconnectSuccess = () => ({
    type: DISCONNECT_SUCCESS_EVT,
});

export const setBooksSnapshot = (data) => ({
    type: BOOKS_SNAPSHOT_DOC,
    payload: data,
});
export const setBooksChange = (data) => ({
    type: BOOKS_CHANGE_DOC,
    payload: data,
});
