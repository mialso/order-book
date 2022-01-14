import { bookRemoteDataCtrl } from '../model/book';
import { totalCtrl } from '../model/total';
import { networkMiddleware } from '../service/network';
import { controlCtrl } from '../model/control/controller';

export function connectMiddleware(controller) {
    return (store) => (next) => (message) => {
        next(message);
        controller(store, message);
    };
};

export const middlewares = [
    bookRemoteDataCtrl,
    totalCtrl,
    controlCtrl,
].map(connectMiddleware).concat(networkMiddleware);
