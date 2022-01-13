export const NETWORK_ONLINE_EVT = 'evt/network/online';
export const NETWORK_OFFLINE_EVT = 'evt/network/offline';

export const networkMiddleware = ({ dispatch }) => {
    window.addEventListener('online', () => dispatch({ type: NETWORK_ONLINE_EVT }));
    window.addEventListener('offline', () => dispatch({ type: NETWORK_ONLINE_EVT }));

    return (next) => (action) => {
        next(action);
    };
}
