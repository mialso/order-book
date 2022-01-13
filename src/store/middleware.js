import { bookRemoteDataCtrl } from '../model/book';
import { totalCtrl } from '../model/total';

export function connectMiddleware(controller) {
    return (store) => (next) => (message) => {
        next(message);
        controller(store, message);
    };
};

export const middlewares = [
    bookRemoteDataCtrl,
    totalCtrl,
].map(connectMiddleware);
