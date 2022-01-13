import { BOOKS_SNAPSHOT_DOC, BOOKS_CHANGE_DOC } from './message';

export const initialState = {
    byPrice: {},
}

export const orderItemFromChange = (data) => {
    const [price, count, amount] = data;
    return { price, count, amount };
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
        (byPrice, changeItem) => {
            const [price] = changeItem;
            return {
                ...byPrice,
                [price]: orderItemFromChange(changeItem),
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
        default: return state;
    }
}
