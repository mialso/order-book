import { BOOKS_SNAPSHOT_DOC, BOOKS_CHANGE_DOC } from './message';

export const initialState = {
    asks: [],
    bids: [],
}

export const askCompareNumbers = (a, b) => (a - b);
export const descCompareNumbers = (a, b) => (b - a);

const isAsk = (amount) => (amount < 0)
const isBid = (amount) => (amount > 0)

export const sortedAsksFromSnapshot = (data) => data.reduce(
        (asks, changeItem) => {
            const [ price, _count, amount ] = changeItem;
            if (isAsk(amount)) {
                asks.push(price)
            }
            return asks
        },
        [],
    ).sort(askCompareNumbers);

export const sortedBidsFromSnapshot = (data) => data.reduce(
        (asks, changeItem) => {
            const [ price, _count, amount ] = changeItem;
            if (isBid(amount)) {
                asks.push(price)
            }
            return asks
        },
        [],
    ).sort(descCompareNumbers);

export const sortedAsksFromChange = (data) => (prevAsks) => data.reduce(
    (nextAsks, changeItem) => {
        const [price, count, amount] = changeItem;
        if (isAsk(amount) && !nextAsks.includes(price)) {
            return nextAsks.concat(price).sort(askCompareNumbers);
        }
        if (isBid(amount) && nextAsks.includes(price)) {
            return nextAsks.filter(item => (item !== price));
        }
        if (!count && nextAsks.includes(price)) {
            return nextAsks.filter(item => (item !== price));
        }
        return nextAsks;
    },
    prevAsks,
)

export const sortedBidsFromChange = (data) => (prevBids) => data.reduce(
    (nextBids, changeItem) => {
        const [price, count, amount] = changeItem;
        if (isBid(amount) && !nextBids.includes(price)) {
            return nextBids.concat(price).sort(descCompareNumbers);
        }
        if (isAsk(amount) && nextBids.includes(price)) {
            return nextBids.filter(item => (item !== price));
        }
        if (!count && nextBids.includes(price)) {
            return nextBids.filter(item => (item !== price));
        }
        return nextBids;
    },
    prevBids,
)

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
            const nextAsks = sortedAsksFromChange(action.payload)(state.asks);
            const nextBids = sortedBidsFromChange(action.payload)(state.bids);
            if (nextAsks !== state.asks || nextBids !== state.bids) {
                return {
                    ...state,
                    bids: nextBids,
                    asks: nextAsks,
                };
            }
            return state;
        }
        default: return state;
    }
}
