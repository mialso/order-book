import { bookRemoteDataCtrl } from '../model/book';

export function connectMiddleware(controller) {
    return (store) => (next) => (message) => {
        next(message);
        controller(store, message);
    };
};

export const middlewares = [
    bookRemoteDataCtrl,
].map(connectMiddleware);
