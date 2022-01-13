import { BOOKS_SNAPSHOT_DOC, BOOKS_CHANGE_DOC } from './message';

export const initialState = {
    asks: [],
    bids: [],
}

export const askCompareNumbers = (a, b) => (a - b);
export const descCompareNumbers = (a, b) => (b - a);

export const sortedAsksFromSnapshot = (data) => data.reduce(
        (asks, changeItem) => {
            const [ price, _count, amount ] = changeItem;
            if (amount < 0) {
                asks.push(price)
            }
            return asks
        },
        [],
    ).sort(askCompareNumbers);

export const sortedBidsFromSnapshot = (data) => data.reduce(
        (asks, changeItem) => {
            const [ price, _count, amount ] = changeItem;
            if (amount > 0) {
                asks.push(price)
            }
            return asks
        },
        [],
    ).sort(descCompareNumbers);

export const byPriceReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKS_SNAPSHOT_DOC: {
            return {
                ...state,
                bids: sortedBidsFromSnapshot(action.payload),
                asks: sortedAsksFromSnapshot(action.payload),
            };
        }
        case BOOKS_CHANGE_DOC: {
            return state;
        }
        default: return state;
    }
}
