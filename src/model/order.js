import { BOOKS_SNAPSHOT_DOC, BOOKS_CHANGE_DOC, ORDER_TOTAL_DOC } from './message';

export const initialState = {
    byPrice: {},
}

export const orderItemFromChange = (data) => {
    const [price, count, amount] = data;
    return { price, count, amount, total: 0 };
}

export const createByPriceFromSnapshot = (payload) => {
    return payload.reduce(
        (byPrice, changeItem) => {
            const item = orderItemFromChange(changeItem);
            // TODO: check zero count
            byPrice[item.price] = item;
            return byPrice;
        },
        {},
    );
}

export const updateByPriceFromChange = (payload) => (byPrice) => {
    return payload.reduce(
        (acc, changeItem) => {
            const [price] = changeItem;
            return {
                ...acc,
                [price]: orderItemFromChange(changeItem),
            };

        },
        byPrice,
    );
}

export const updateByPriceFromTotal = (payload) => (byPrice) => {
    return Object.keys(payload).reduce(
        (acc, price) => {
            const item = byPrice[price];
            if (!item) {
                return acc
            }
            const newTotal = payload[price]
            if (item.total === newTotal) {
                return acc;
            }

            return {
                ...acc,
                [price]: { ...item, total: newTotal },
            };
        },
        byPrice,
    );
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKS_SNAPSHOT_DOC: {
            const byPrice = createByPriceFromSnapshot(action.payload)
            return {
                ...state,
                byPrice,
            };
        }
        case BOOKS_CHANGE_DOC: {
            return {
                ...state,
                byPrice: updateByPriceFromChange(action.payload)(state.byPrice),
            }
        }
        case ORDER_TOTAL_DOC: {
            const nextByPrice = updateByPriceFromTotal(action.payload)(state.byPrice);
            if (nextByPrice === state.byPrice) {
                return state;
            }
            
            return { ...state, byPrice: nextByPrice };
        }
        default: return state;
    }
}
